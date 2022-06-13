import { ChakraProvider } from "@chakra-ui/react";
import { cacheExchange, query } from "@urql/exchange-graphcache";
import { AppProps } from "next/app";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { LoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import theme from "../theme";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (result: LoginMutation, args, cache, info) => {
          cache.updateQuery({ query: MeDocument }, (data: MeQuery | null): MeQuery | null => {
            if (!result.login) {
              return data;
            }

            return { me: result.login };
          })
        },
      }
    }
  }), fetchExchange],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
