import { useEffect, useState } from "react";
import {
  Heading,
  Flex,
  Stack,
  Box,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@chakra-ui/core";
import TableRow from "../components/customerData";

export default function Home() {
  const [data, setData] = useState([]);
  const [formData, updateFormData] = useState({});
  const initialData = Object.freeze({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    cardType: "",
    cardNumber: null,
  });

  async function getData() {
    const res = await fetch("/api/getCustomers", { cache: "no-store" });
    const newData = await res.json();
    setData(newData);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer();
  };

  return (
    <Box>
      <Heading as="h1" my={2} textAlign="center">
        NextJS, Fauna, Serverless
      </Heading>
      <Heading as="h3" my={2} textAlign="center">
        Customer DATA
      </Heading>
      <Flex mt={12} align="center" justify="center">
        <Stack>
          <Heading mb={6} as="h4">
            Name:
          </Heading>
          <Heading mb={6} as="h4">
            Phone:
          </Heading>
          <Heading mb={6} as="h4">
            Credit Card:
          </Heading>
        </Stack>
        {data.length > 0 ? (
          data.map((d) => (
            <TableRow
              key={d.data.telephone}
              creditCard={d.data.creditCard.number}
              firstName={d.data.firstName}
              lastName={d.data.lastName}
              telephone={d.data.telephone}
            />
          ))
        ) : (
          <>
            <TableRow loading />
            <TableRow loading />
            <TableRow loading />
          </>
        )}
      </Flex>
      <Heading as="h4" mt={6} align="center" justify="center">
        <form onSubmit={handleSubmit} method="post">
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              aria-describedby="first-name-helper-text"
            />
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              aria-describedby="last-name-helper-text"
            />
            <FormLabel htmlFor="streetAddress">Street Address</FormLabel>
            <Input
              type="text"
              id="streetAddress"
              name="streetAddress"
              onChange={handleChange}
              aria-describedby="street-address-helper-text"
            />
            <Stack isInline mt={2}>
              <FormLabel mt={2} htmlFor="city">
                City
              </FormLabel>
              <Input
                type="text"
                id="city"
                name="city"
                onChange={handleChange}
                aria-describedby="city-helper-text"
              />
              <FormLabel mt={2} htmlFor="state">
                State
              </FormLabel>
              <Input
                type="text"
                id="state"
                name="state"
                onChange={handleChange}
                aria-describedby="state-helper-text"
              />
              <FormLabel htmlFor="zipcode">Zip Code</FormLabel>
              <Input
                type="text"
                name="zipcode"
                id="zipcode"
                onChange={handleChange}
                aria-describedby="zipcode-helper-text"
              />
            </Stack>
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <Input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleChange}
              aria-describedby="phoneNumber-helper-text"
            />
            <RadioGroup name="cardType" my={4} spacing={8} isInline>
              <Radio
                onChange={handleChange}
                name="Visa"
                value="Visa"
                label="Visa"
              >
                Visa
              </Radio>
              <Radio
                onChange={handleChange}
                name="MasterCard"
                label="MasterCard"
                value="MasterCard"
              >
                MasterCard
              </Radio>
              <Radio
                onChange={handleChange}
                name="Amex"
                value="Amex"
                label="Amex"
              >
                American Express
              </Radio>
            </RadioGroup>
            <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
            <Input
              type="number"
              name="cardNumber"
              id="cardNumber"
              onChange={handleChange}
              aria-describedby="cardNumber-helper-text"
            />
            <Button
              type="submit"
              my={8}
              ml="20%"
              width="50%"
              size="md"
              height="48px"
              border="2px"
              borderColor="green.500"
            >
              Add Customer
            </Button>
          </FormControl>
        </form>
      </Heading>
    </Box>
  );
}
