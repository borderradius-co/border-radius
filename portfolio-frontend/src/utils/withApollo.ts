
import { withApollo as createWithApollo} from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PaginatedProjects } from "../generated/graphql";
import { NextPageContext } from "next";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            projects: {
              keyArgs: [],
              merge(
                existing: PaginatedProjects | undefined,
                incoming: PaginatedProjects
              ): PaginatedProjects {
                return {
                  ...incoming,
                  projects: [...(existing?.projects || []), ...incoming.projects],
                };
              },
            },
          },
        }, 
      },
    }),
  });

export const withApollo = createWithApollo(createClient);