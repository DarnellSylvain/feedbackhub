import React from "react";
import { Heading, Box, Text, Button } from "@chakra-ui/react";

import DashboardShell from "./DashboardShell";

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Box width="100%" backgroundColor="whiteAlpha.900" borderRadius="8px" p={8}>
      <Heading as="h2" size="md">
        Get Feedback on your site instantly.
      </Heading>
      <Text>Start today, then grow with us</Text>
      <Button variant="solid" size="md">
        Upgrade to Starter
      </Button>
    </Box>
  </DashboardShell>
);

export default FreePlanEmptyState;
