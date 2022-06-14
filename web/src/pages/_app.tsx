import { ChakraProvider } from "@chakra-ui/react";
import { cacheExchange } from "@urql/exchange-graphcache";
import { AppProps } from "next/app";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { LoginMutation, LogoutMutation, MeDocument, MeQuery } from "../generated/graphql";
import theme from "../theme";

const client = createClient({
  url: `${process.env.NEXT_PUBLIC_BE_APP_URI}/graphql`,
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        logout: (result: LogoutMutation, args, cache, info) => {
          cache.updateQuery({ query: MeDocument }, (): MeQuery | null => ({ me: null }));
        },
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
