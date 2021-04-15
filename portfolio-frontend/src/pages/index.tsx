import { NavBar } from "../components/NavBar";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import {useProjectsQuery}  from "../generated/graphql"
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {Box, Button, Flex, Heading, Link, Stack, Text} from "@chakra-ui/react"
import React, { useState } from "react";

const Index = () => {
    const [variables, setVariables] = useState({limit: 10, cursor: null as null | string});
    const [{fetching, data}] = useProjectsQuery({
        variables,
    });

    if (!fetching && !data) {
        return <div>There are nothing to display! Error!</div>
    }

    
    return (

        <Layout>
            <Flex align="center" marginBottom="4">
            <Heading>Border Radius</Heading>
            <NextLink href="/create-project">
                <Link marginLeft="auto">Create New</Link>
            </NextLink>
            </Flex>
            
            {fetching && !data ? (
            <div>loading...</div>
            ) : (
            <Stack spacing={8}>
                {data!.projects.projects.map((project) => (
                    <Box key={project.id} p={5}  borderWidth="1px" >
                        <Heading fontSize="xl">{project.name}</Heading>
                        <Text mt={4}>{project.text}</Text>
                    </Box>

                ))}
            </Stack>
            


            )}
            {data && data.projects.hasMore ? (
                <Flex marginTop="4">
                <Button
                onClick={() => {
                    setVariables({
                        limit: variables.limit, 
                        cursor: data.projects.projects[data.projects.projects.length - 1].createdAt,
                    })
                }} 
                isLoading={fetching} 
                textColor="black"  
                marginY="8" 
                variant="link">Load more...</Button>
            </Flex> 
            ) : null}
            
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(Index);
