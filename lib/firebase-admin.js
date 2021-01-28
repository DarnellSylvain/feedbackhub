import admin from "firebase-admin";
import "firebase/auth";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      project_id: "feedback-hub-demo",
    }),
    databaseURL: "https://feedback-hub-demo-default-rtdb.firebaseio.com",
  });
}
const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
