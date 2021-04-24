import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useBooksQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import {Flex, Stack,Text, Box, Heading,Link, Button} from "@chakra-ui/react"
import NextLink from "next/link"

const Books = () => {
    const [variables, setVariables] = useState({take: 10});
    const [{fetching, data}] = useBooksQuery({
        variables,
    });

    if (!fetching && !data) {
        return <div>There are nothing to display</div>
    }
    return (
        <Layout>
            <Flex align="center" marginBottom="4">
                <Heading>Books</Heading>
            </Flex>
            {fetching && !data ? (
                <div>loading...</div>
            ): (
                <Stack>
                    {data!.books.map((book) => 
                    !book ? null : (
                        <Flex>
                            <Box>
                            <NextLink href="/book/id" as={`/book/${book.id}`} >
                                <Link>
                                <Heading fontSize="xl">{book.title}</Heading>
                               </Link>
                             </NextLink>
                            </Box>
                        </Flex>
                    ))}
                </Stack>
                )} 
        </Layout>
    )};

export default withUrqlClient(createUrqlClient)(Books);