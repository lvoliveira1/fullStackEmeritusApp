import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useRouter } from "next/router";
import { Container } from "../../components/Container";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import { Hero } from "../../components/Hero";
import { Main } from "../../components/Main";
import Navbar from "../../components/NavBar";
import { useRegisterMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorsMap";

const CreateBankAccount = () => {
  const router = useRouter(); 
  const [, register] = useRegisterMutation();

  return (
    <>
    <Navbar></Navbar>
    <Container height="100vh">
      <Hero title='Create bank account'/>
      <Main>
        <Flex bg="white.100" align="center" justify="center" h="100vh">
          <Box bg="white" p={6} rounded="md" w={64}>
            <Formik
              initialValues={{
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                rememberMe: false,
              }}
              onSubmit={async ({ rememberMe, ...values }, { setErrors, setStatus }) => {
                const { error, data } = await register({ data: values });

                if (error?.graphQLErrors) {
                  setErrors(toErrorMap(error.graphQLErrors));
                  return
                }

                router.push('/');
              }}
            >
              {({ isSubmitting, handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl
                      isInvalid={!!errors.firstName && touched.firstName}
                    >
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <Field
                        as={Input}
                        id="firstName"
                        name="firstName"
                        type="firstName"
                        variant="filled"
                      />
                      <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.lastName && touched.lastName}
                    >
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <Field
                        as={Input}
                        id="lastName"
                        name="lastName"
                        type="lastName"
                        variant="filled"
                      />
                      <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.email && touched.email}
                    >
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        validate={(value: string) => {
                          if (value.length < 6) {
                            return "Password must contain at least 6 characters";
                          }
                        }}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="purple"
                      width="full"
                    >
                      Create New User
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Main>

      <DarkModeSwitch />
    </Container>
    </>
  );
};

export default CreateBankAccount;
