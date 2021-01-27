import Head from "next/head";
import { useAuth } from "@/lib/auth";
import { Button, Flex } from "@chakra-ui/react";
import { FastFeedbackIcon } from "public/Icon";

const Home = () => {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      height="100vh"
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('feedback-hub-auth')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
        <title>Feedback Hub</title>
      </Head>

      <FastFeedbackIcon boxSize="64px" />

      {auth.user ? (
        <Button as="a" fontWeight="medium" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => auth.signinWithGithub()}>
          Sign In
        </Button>
      )}

      <footer></footer>
    </Flex>
  );
};

export default Home;
