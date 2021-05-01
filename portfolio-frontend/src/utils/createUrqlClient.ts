import { dedupExchange, fetchExchange , Exchange, stringifyVariables} from "urql"
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, RegisterMutation, VoteMutationVariables, DeleteProjectMutationVariables } from "../generated/graphql"
import { betterUpdateQuery } from "./betterUpdateQuery"
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import {pipe, tap} from "wonka";
import Router from "next/router";
import gql from "graphql-tag"
import { isServer } from "./isServer";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        Router.replace("/login")
      }
    })
  );
};




const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(cache.resolveFieldByKey(entityKey, fieldKey) as string, "projects");
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, "projects") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      console.log("data: ",hasMore, data)
      results.push(...data)
    });
    return {
      __typename: "PaginatedProjects",
      hasMore,
      projects: results

    } 

  };
};

function invalidateAllProjects(cache: Cache) {
  const allFields = cache.inspectFields('Query');
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "projects"
    );
  fieldInfos.forEach((field)=> {
    cache.invalidate('Query', 'projects', field.arguments || { })
  })
}


export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
    console.log("cookie: ", cookie)
  }
  console.log('api url:', process.env.NEXT_PUBLIC_API_URL)
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
    credentials: 'include' as const,
    headers: cookie ? {
      cookie,
    } : undefined
  },
  exchanges: [
    dedupExchange, 
    cacheExchange({
      keys: {
        PaginatedProjects: () => null,
      },
      resolvers: {
        Query: {
          projects: cursorPagination()
        },
      },
      updates: {
        Mutation: {
          deleteProject: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "Project",
              id: (args as DeleteProjectMutationVariables).id,
            });
          },
          vote: (_result, args, cache, info)=> {
            const {projectId, value} = args as VoteMutationVariables;
            const data = cache.readFragment(
              gql `
                fragment __ on Project {
                  id
                  points
                  voteStatus
                }
              `,
              {id: projectId} as any
            );
            console.log('data: ', data)
            if (data) {
                if (data.voteStatus === value) {
                  return
                }
                const newPoints = (data.points as number) + (!data.voteStatus ? 1 : 2) * value ;
                cache.writeFragment(
                  gql`
                    fragment _ on Project {
                      points
                      voteStatus
                    }
                  `,
                  { id: projectId, points: newPoints, voteStatus: value } as any
                );
            }
          },
          createProject: (_result, args, cache, info) => {
            // console.log("start")
            // console.log(cache.inspectFields('Query'))
            invalidateAllProjects(cache)
          
            // console.log(cache.inspectFields('Query'))
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(cache, {query: MeDocument}, _result, () => ({me:null}))

          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(cache, {query: MeDocument},
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query
                } else {
                  return {
                    me: result.login.user,
                  }
                }
              })
              
            invalidateAllProjects(cache)

          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(cache, {query: MeDocument},
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query
                } else {
                  return {
                    me: result.register.user,
                  }
                }

              })
          },
        }
      }
  }), 
  errorExchange,
  ssrExchange,
  fetchExchange
  ],
};
};




interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await vote({
            variables: {
              postId: post.id,
              value: 1,
            },
            update: (cache) => updateAfterVote(1, post.id, cache),
          });
          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loadingState === "updoot-loading"}
        aria-label="updoot post"
        icon="chevron-up"
      />
      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            variables: {
              postId: post.id,
              value: -1,
            },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === -1 ? "red" : undefined}
        isLoading={loadingState === "downdoot-loading"}
        aria-label="downdoot post"
        icon="chevron-down"
      />
    </Flex>
  );
};

