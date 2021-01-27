import Feedback from "@/components/Feedback";

import { createFeedback } from "@/lib/db";

import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
      revalidate: 1,
    },
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const checkDisplayName = () => {
    return auth.user.name == null ? auth.user.email : auth.user.name;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      author: checkDisplayName(),
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: "pending",
    };

    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        {" "}
        <FormControl my={8}>
          <FormLabel>Comment</FormLabel>
          <Input ref={inputEl} type="comment" id="comment" />
          <Button fontWeight="medium" my={2} type="submit">
            Add Comment
          </Button>
        </FormControl>
      </Box>

      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
