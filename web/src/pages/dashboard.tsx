import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Container } from "../components/Container";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import Navbar from "../components/NavBar";
import { useMeQuery, useOperateMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorsMap";

const Dashboard = () => {
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    if (!fetching && !data?.me) {  
      const router = useRouter();
      router.replace('/');
    }
  });

  const [, operateBankAccount] = useOperateMutation();

  const [, setTabIndex] = React.useState(0);let key = 0;

  return (
    <>
      <Navbar></Navbar>
      <Container height="100vh">
        <Hero title="Check out your Bank Acc Info" />
        <Main>
          <Flex bg="white.100" align="center" justify="center" h="100vh">
            <Box bg="white" rounded="md" w="100vh" h="40vh">
              <Tabs
                isFitted
                size="lg"
                align="center"
                variant="enclosed"
                defaultIndex={1}
              >
                <TabList>
                  <Tab>New Operation</Tab>
                  <Tab>Statments</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Box bg="white" p={10} rounded="lg" w="60vh">
                      <Formik
                        initialValues={{
                          operationType: "",
                          amount: 0,
                          description: "",
                        }}
                        onSubmit={async (payload, { setErrors }) => {
                          const { error } = await operateBankAccount({
                            bankAccountId: data!.me!.id,
                            payload,
                          });

                          if (error?.graphQLErrors) {
                            setErrors(toErrorMap(error.graphQLErrors));
                            return;
                          }

                          setTabIndex(1);
                        }}
                      >
                        {({ isSubmitting, handleSubmit, errors, touched }) => (
                          <form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                              <FormControl>
                                <FormLabel htmlFor="operationType">
                                  Operation
                                </FormLabel>
                                <Field
                                  as={Select}
                                  id="operationType"
                                  name="operationType"
                                  placeholder='Select the desired operation type' 
                                >
                                  <option value='deposit'>Deposit</option>
                                  <option value='withdraw'>WithDraw</option>
                                </Field>
                              </FormControl>
                              <FormControl>
                                <FormLabel htmlFor="description">Description</FormLabel>
                                <Field
                                  as={Input}
                                  id="description"
                                  name="description"
                                  type="text"
                                  variant="filled"
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel htmlFor="amount">Amount</FormLabel>
                                <Field
                                  as={Input}
                                  id="amount"
                                  name="amount"
                                  type="number"
                                  variant="filled"
                                />
                              </FormControl>
                              <Button
                                type="submit"
                                isLoading={isSubmitting}
                                colorScheme="purple"
                                width="full"
                              >
                                Make new operation
                              </Button>
                            </VStack>
                          </form>
                        )}
                      </Formik>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <TableContainer>
                      <Table variant="striped" colorScheme="green" size="lg">
                        <Thead>
                          <Tr>
                            <Th scope="col">Transaction Type</Th>
                            <Th scope="col">Amount</Th>
                            <Th scope="col">Description</Th>
                            <Th scope="col">Balance</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {!data?.me
                            ? null
                            : data?.me.statments.map(
                                ({
                                  operationType,
                                  amount,
                                  description,
                                  balance,
                                }: any) => (
                                  <Tr key={key++}>
                                    <Td>{operationType}</Td>
                                    <Td>{amount}</Td>
                                    <Td>{description}</Td>
                                    <Td>{balance}</Td>
                                  </Tr>
                                )
                              )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </Main>
      </Container>
    </>
  );
};

export default Dashboard;
