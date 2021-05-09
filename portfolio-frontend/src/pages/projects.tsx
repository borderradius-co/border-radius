import { NavBar } from "../components/NavBar";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import {ProjectQuery, ProjectsQuery, useMeQuery, useProjectsQuery, useUpdateProjectMutation}  from "../generated/graphql"
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {Box, Button, Image, Flex, Heading, Link, Stack, Text, Icon, IconButton, Avatar, Divider } from "@chakra-ui/react"
import React, { useState } from "react";
import { UpdootSection } from "../components/UpdootSection";
import {useDeleteProjectMutation} from "../generated/graphql"
import { EditDeleteProjectButtons } from "../components/EditDeleteProjectButtons";
import { SimpleGrid } from "@chakra-ui/react"
import { NotionButton } from "../components/NotionButton";
import {MdStayPrimaryPortrait, MdStayPrimaryLandscape} from "react-icons/md"
import CreateModal from "../components/CreateModal";
import { withApollo } from "../utils/withApollo";




const Projects = () => {
    const {loading, data, fetchMore, variables} = useProjectsQuery({
        variables: {
            limit: 10, 
            cursor: null
        },
        notifyOnNetworkStatusChange: true
    });
    const [iconVar, setIconVar] = useState('MdStayPrimaryPortrait')
    
    const [toggle, setToggle] = useState(false)
    const toggleIt = () => {
        setToggle(!toggle)
    }

    if (!loading && !data) {
        return <div>There are nothing to display! Error!</div>
    }


    

    
    return (

        <Layout>
            <Flex 
            align="center" 
            marginBottom="4" 
            justify="space-between"
            >
            <Heading>Projects</Heading>
           
            
            <Flex align="center">
            <Text marginRight="4">{toggle ? 'Mobile' : 'Tablet'}</Text>
            <IconButton  
                marginRight="2"
                aria-label="Screen" 
                onClick={toggleIt}
                icon={toggle ? <MdStayPrimaryLandscape/> : <MdStayPrimaryPortrait/>}
                size="md"
                variant="outline"
                _hover={{bg:"#ffffff"}}
                _focus={{bg:"#ffffff"}}
                _active={{bg:"#ffffff"}}
                />
         
                    
               
            <CreateModal></CreateModal>

            </Flex>
            
            </Flex>
            
            {loading && !data ? (
            <div>loading...</div>
            ) : (
                <SimpleGrid columns={toggle ? 1 : 2} spacing={4}>
                    {data!.projects.projects.map((project) =>
                    !project ? null : (
                        <Flex 
                        alignItems="flex-end" 
                        key = {project.id} 
                        padding={5} 
                        // borderWidth="0.5px" 
                        borderRadius="5" 
                        direction="column" 
                        justifyContent="space-between"
                        _hover={{bg:"#f7f7f7", borderColor:"#8D036F" }}
                        >
                        
                            <EditDeleteProjectButtons id={project.id} creatorId={project.creator.id} name={project.name} />

                            <NextLink href="/project/id" as={`/project/${project.id}`} >


                            <Flex flexDirection="column" justifyContent="space-evenly">

                                <NextLink href="/project/id" as={`/project/${project.id}`} >
                                    <Link marginTop="20px">
                                        <Heading fontSize="xl">{project.name}</Heading>   
                                    </Link>  

                                </NextLink>
                                {/* <Box align="center" >
                                    <Image marginTop="20px" minHeight="240px" maxHeight="240px" objectFit="cover" width="100%" src={`./images/${project.name}.jpg`} />
                                </Box> */}
                                <Flex marginBottom="4" marginTop="4" align="center">

                                    <Avatar   
                                    src="https://drive.google.com/thumbnail?id=1ZjpqPRooXmFrTNR2PpGduhK_eRSmHi97"  
                                    name={project.creator.username} 
                                    size="xs" bg="blue.900"
                                     color="white" 
                                     marginRight="2"/>
                                    <Divider width="5%" marginRight="2" />

                                    <Text marginRight="4" fontSize="16px" textColor="gray.600" fontWeight="light">{project.creator.username}</Text> 
                                
                                </Flex>
                                            
                                <Text  mt={4}>{project.textSnippet}</Text>
                                <Flex marginTop="4" align="center">
                               


                                </Flex>   
                                             
                            </Flex> 
                            </NextLink>
                            <NotionButton></NotionButton>
                            <UpdootSection project={project}></UpdootSection>
                            
                        </Flex>
                    ))}
                </SimpleGrid>
            )}
            {data && data.projects.hasMore ? (
                <Flex marginTop="4">
                <Button
              onClick={() => {
                fetchMore({
                  variables: {
                    limit: variables?.limit,
                    cursor:
                      data.projects.projects[data.projects.projects.length - 1].createdAt,
                  },
                });
            }}
                isLoading={loading} 
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

export default withApollo({ssr: true})(Projects);