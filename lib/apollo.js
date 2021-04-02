import { withApollo } from "next-apollo";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat
} from "@apollo/client";

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization:
        "ApiKey 5182deaae273bd8535414df673e784a208200e66089d87fef887826f159293a8"
    }
  });

  return forward(operation);
});

const httpLink = new HttpLink({ uri: "https://swop.cx/graphql" });

const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});

export default withApollo(apolloClient);
