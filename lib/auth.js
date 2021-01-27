import React, { useState, useEffect, useContext, createContext } from "react";
import { createUser } from "./db";
import firebase from "./firebase";

import Cookies from "js-cookie";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);

      setUser(user);
      Cookies.set("feedback-hub-auth", true, {
        expires: 1,
      });
      return user;
    } else {
      setUser(false);
      Cookies.remove("feedback-hub-auth");
      return false;
    }
  };

  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        handleUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout,
  };
}

const formatUser = async (user) => {
  const idTokenResult = await user.getIdTokenResult();
  const idToken = idTokenResult.token;

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: idToken,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};

const getFromQueryString = (key) => {
  return queryString.parse(window.location.search)[key];
};
