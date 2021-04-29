import { NavBar } from "../components/NavBar";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import {useMeQuery, useProjectsQuery, useUpdateProjectMutation}  from "../generated/graphql"
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




const ProjectsGrid = () => {
    const [variables, setVariables] = useState({limit: 10, cursor: null as null | string});
    const [{fetching, data}] = useProjectsQuery({
        variables,
    });
    const [iconVar, setIconVar] = useState('MdStayPrimaryPortrait')
    
    const [toggle, setToggle] = useState(false)
    const toggleIt = () => {
        setToggle(!toggle)
    }
    const columns = [1, 2]
    const [, deleteProject] = useDeleteProjectMutation()

    if (!fetching && !data) {
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
           
              
            {/* <IconButton key="tableModeButton" 
 onTouchTap={() => { 
   this.setState({
     isCardView: !this.state.isCardView
   })
  }}>
   {this.state.isCardView ? <IconA /> : <IconB /> }
</IconButton> */}
        
            {/* <NextLink href="/create-project">
                <Link marginLeft="auto">Create New</Link>
            </NextLink> */}
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
            
            {fetching && !data ? (
            <div>loading...</div>
            ) : (
                <SimpleGrid columns={columns[toggle ? '0' : '1']} spacing={4}>
                    {data!.projects.projects.map((project) =>
                    !project ? null : (
                        <Flex 
                        alignItems="flex-start" 
                        key = {project.id} 
                        padding={5} 
                        borderWidth="0.5px" 
                        borderRadius="5" 
                        direction="column" 
                        justifyContent="space-between"
                        _hover={{border:"1px", borderColor:"#8D036F" }}
                        >
                        
                            <EditDeleteProjectButtons id={project.id} creatorId={project.creator.id} name={project.name} />

                            <NextLink href="/project/id" as={`/project/${project.id}`} >


                            <Flex flexDirection="column" justifyContent="space-evenly">

                                <NextLink href="/project/id" as={`/project/${project.id}`} >
                                    <Link marginTop="20px">
                                        <Heading fontSize="xl">{project.name}</Heading>   
                                    </Link>  

                                </NextLink>
                                <Box align="center" >
                                    <Image marginTop="20px" minHeight="240px" maxHeight="240px" objectFit="cover" width="100%" src={`./images/${project.name}.jpg`} />
                                </Box>
                                <Flex marginBottom="4" marginTop="4" align="center">

                                    <Avatar   
                                    src="https://bit.ly/code-beast"  
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