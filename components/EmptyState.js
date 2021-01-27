import React from "react";
import { Heading, Flex, Text, Button } from "@chakra-ui/react";

import DashboardShell from "./DashboardShell";
import AddSiteModal from "./AddSiteModal";

const EmptyState = () => (
  <Flex
    width="100%"
    backgroundColor="whiteAlpha.900"
    borderRadius="8px"
    p={16}
    justify="center"
    align="center"
    direction="column"
  >
    <Heading mb={4} as="h2" size="md">
      You haven't added any sites.
    </Heading>
    <Text mb={4}>Welcome. Let's get started</Text>
    <AddSiteModal>Add Your First Site</AddSiteModal>
  </Flex>
);

export default EmptyState;
