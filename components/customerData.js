import { Divider, Stack, Text, Box } from "@chakra-ui/core";

export default function TableRow({
  creditCard,
  firstName,
  loading,
  lastName,
  telephone,
}) {
  return (
    <Box>
      <Stack isInline>
        <Box>
          <Text
            fontSize="lg"
            my={4}
            mx={4}
            className={loading ? "loading" : ""}
          >
            {firstName} {lastName}
          </Text>
        </Box>
      </Stack>
      <Divider border="4px" />
      <Stack isInline>
        <Text
          fontSize="lg"
          my={4}
          mx={4}
          className={`telephone ${loading ? "loading" : ""}`}
        >
          {telephone}
        </Text>
      </Stack>
      <Divider border="4px" />
      <Stack isInline>
        <Text
          fontSize="lg"
          my={4}
          mx={4}
          className={`credit-card credit-card-number ${
            loading ? "loading" : ""
          }`}
        >
          {creditCard}
        </Text>
      </Stack>
      <Divider border="4px" />
    </Box>
  );
}
