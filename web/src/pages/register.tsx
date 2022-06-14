import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useRouter } from "next/router";
import { Container } from "../components/Container";
import NextLink from "next/link";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { useLoginMutation, useMeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorsMap";
import { useEffect } from "react";

const Register = () => {
  const router = useRouter(); 
  
  const [, register] = useRegisterMutation();
  const [, login] = useLoginMutation();

  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {  
    if (!fetching && data?.me) {
      router.replace('/dashboard');
    }
  });

  return (
    <Container height="100vh">
    <Hero title="Register into the Bad bank" />
      <Main>
        <div>Register Page</div>
        <Flex bg="white.100" align="center" justify="center" h="100vh">
          <Box bg="white" p={6} rounded="md" w={64}>
            <Formik
              initialValues={{
                email: "",
                firstName: "",
                lastName: "",
                password: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const { email, password } = values;

                const { error } = await register({ data: values });
                const { error: loginError } = await login({ email, password });

                if (error?.graphQLErrors) {
                  setErrors(toErrorMap(error.graphQLErrors));
                  return
                }

                if (loginError?.graphQLErrors) {
                  router.push('/');
                }

                router.push('/dashboard');
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
                    <NextLink href="/">
                      <Link>Login</Link>
                    </NextLink>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="purple"
                      width="full"
                    >
                      Create an Account
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Main>
    </Container>
  );
};

export default Register;
