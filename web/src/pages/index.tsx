import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useRouter } from "next/router";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorsMap";

const Index = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Container height="100vh">
      <Hero title="Welcome to the Bad bank"/>
      <Main>
        <Flex bg="white.100" align="center" justify="center" h="100vh">
          <Box bg="white" p={6} rounded="md" w={64}>
            <Formik
              initialValues={{
                email: "",
                password: "",
                rememberMe: false,
              }}
              onSubmit={async (values, { setErrors }) => {
                const { error, data } = await login(values);

                if (error?.graphQLErrors) {
                  setErrors(toErrorMap(error.graphQLErrors));
                  return;
                }

                router.push("/dashboard");
              }}
            >
              {({ isSubmitting, handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                      />
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
                        validate={(value: any) => {
                          let error;

                          if (value.length < 5) {
                            error =
                              "Password must contain at least 6 characters";
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <Field
                      as={Checkbox}
                      id="rememberMe"
                      name="rememberMe"
                      colorScheme="purple"
                    >
                      Remember me?
                    </Field>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="purple"
                      width="full"
                    >
                      Login
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Main>

      <DarkModeSwitch />
      {/* <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer> */}
      {/* <CTA /> */}
    </Container>
  );
};

export default Index;
