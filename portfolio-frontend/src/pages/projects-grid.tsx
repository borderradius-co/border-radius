import { NavBar } from "../components/NavBar";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import {useMeQuery, useProjectsQuery, useUpdateProjectMutation}  from "../generated/graphql"
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {Box, Button, Image, Flex, Heading, Link, Stack, Text, Icon, IconButton, Avatar } from "@chakra-ui/react"
import React, { useState } from "react";
import { UpdootSection } from "../components/UpdootSection";
import {useDeleteProjectMutation} from "../generated/graphql"
import { EditDeleteProjectButtons } from "../components/EditDeleteProjectButtons";
import { SimpleGrid } from "@chakra-ui/react"
import { NotionButton } from "../components/NotionButton";



const ProjectsGrid = () => {
    const [variables, setVariables] = useState({limit: 10, cursor: null as null | string});
    const [{fetching, data}] = useProjectsQuery({
        variables,
    });
    const [, deleteProject] = useDeleteProjectMutation()

    if (!fetching && !data) {
        return <div>There are nothing to display! Error!</div>
    }

    
    return (

        <Layout>
            <Flex align="center" marginBottom="4">
            <Heading>Projects</Heading>
            <NextLink href="/create-project">
                <Link marginLeft="auto">Create New</Link>
            </NextLink>
            </Flex>
            
            {fetching && !data ? (
            <div>loading...</div>
            ) : (
                <SimpleGrid columns={2} spacing={4}>
                    {data!.projects.projects.map((project) =>
                    !project ? null : (
                        <Flex alignItems="flex-end" key = {project.id} padding={5} borderWidth="0.5px" borderRadius="5" direction="column" justifyContent="space-between">
                            <EditDeleteProjectButtons id={project.id} creatorId={project.creator.id} name={project.name} />

                            <Flex flexDirection="column" justifyContent="space-evenly">

                                <NextLink href="/project/id" as={`/project/${project.id}`} >
                                    <Link marginTop="20px">
                                        <Heading fontSize="xl">{project.name}</Heading>   
                                    </Link>  

                                </NextLink>
                                <Flex align="center" >
                                    <Image marginTop="20px" maxH="200px" src='./images/team.svg' />
                                </Flex>
                                <Flex marginBottom="4" marginTop="4" align="center">
                                    <Avatar name={project.creator.username} size="xs" bg="blue.900"
                                     color="white" marginRight="2"/>
                                    <Text marginRight="4" fontSize="12px">{project.creator.username}</Text> 
                                
                                </Flex>
                                            
                                <Text  mt={4}>{project.textSnippet}</Text>
                                <Flex marginTop="4" align="center">
                               


                                </Flex>   
                                             
                            </Flex> 
                            <NotionButton></NotionButton>
                            <UpdootSection project={project} direction="vertical"></UpdootSection>
                            
                        </Flex>
                    )
                    
                    )}
                </SimpleGrid>
                
            // <Stack spacing={8}>
            //     {data!.projects.projects.map((project) => 
            //     !project ? null : (
            //         <Flex key={project.id} p={5}  borderWidth="1px" alignItems="center">
            //             <UpdootSection project={project} ></UpdootSection> 
            //             <Box>
            //                 <NextLink href="/project/id" as={`/project/${project.id}`} >
            //                     <Link>
            //                         <Heading fontSize="xl">{project.name}</Heading>   
            //                     </Link>  
            //                 </NextLink>
                                         
            //                 <Text mt={4}>{project.text}</Text>
            //                 <Text>Created by {project.creator.username}</Text> 
            //                 <Box marginLeft="auto">
            //                    <EditDeleteProjectButtons id={project.id} creatorId={project.creator.id} />
            //                 </Box>
                            
                            
            //             </Box>          
            //         </Flex>

            //     ))}
            // </Stack>
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
                marginY="8" 
                variant="link"
                _hover={{bg:"none"}}
                _focus={{bg:"none"}}
                
                >Load more...</Button>
            </Flex> 
            ) : null}
            
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(ProjectsGrid);