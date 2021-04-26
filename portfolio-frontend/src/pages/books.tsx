import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useBooksQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import {Flex, Stack,Text, Box, Heading,Link, Button} from "@chakra-ui/react"
import NextLink from "next/link"

const Books = () => {
    // const [variables, setVariables] = useState({take: 10});
    const [variables, setVariables] = useState({limit: 10, cursor: null as null | string});
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
            ) : (
            <Stack spacing={8}>
                {data!.books.books.map((book) => 
                !book ? null : (
                    <Flex key={book.id} p={5}  borderWidth="1px" alignItems="center">
                        <Box>
                            <NextLink href="/book/id" as={`/book/${book.id}`} >
                                <Link>
                                    <Heading fontSize="xl">{book.title}</Heading>   
                                </Link>  
                            </NextLink>
                                         
                            <Text mt={4}>{book.title}</Text>
                            
                            
                        </Box>          
                    </Flex>

                ))}
            </Stack>
            )}
            {data && data.books.hasMore ? (
                <Flex marginTop="4">
                <Button
                onClick={() => {
                    setVariables({
                        limit: variables.limit, 
                        cursor: data.books.books[data.books.books.length - 1].createdAt,
                    })
                }} 
                isLoading={fetching} 
                marginY="8" 
                variant="link">Load more...</Button>
            </Flex> 
            ) : null}
            
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(Books);