import { Heading, Text,Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Avatar, Button, Divider, HStack, IconButton, VStack } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React, {useState} from 'react'
import { EditDeleteCommentButtons } from '../../components/EditDeleteCommentButtons';
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetProjectFromUrl } from '../../utils/useGetProjectFromUrl';
import NextLink from "next/link"
import { useCreateProjectCommentMutation, useMeQuery } from '../../generated/graphql';
import { useIsAuth } from '../../utils/useIsAuth';
import { Formik, Form } from 'formik';
import router from 'next/router';
import InputField from '../../components/InputField';
import {MdMoreVert} from "react-icons/md"

export const Project: React.FC<{}> = ({}) => {
    useIsAuth()
    const [, createComment] = useCreateProjectCommentMutation();
    const [{data, fetching, error}] = useGetProjectFromUrl()
    const [{data: meData, fetching: meFetching}] = useMeQuery()
    if (fetching) {
        return (
            <Layout> 
                <div>loading...l</div>
            </Layout>
        )
    }

    if (error) {
        return (
            <div> {error.message} </div>
        )
    }

    if (!data?.project) {
        return (
            <Layout>
                <Box>Could not find project</Box>
            </Layout>
        )
    }
   
        return (
            <Layout>
                <Breadcrumb marginBottom="24px">
                <BreadcrumbItem>
                <NextLink href="/projects">
                    <BreadcrumbLink> Projects </BreadcrumbLink>
                </NextLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{data.project.name}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                </Breadcrumb>
            
                
                
               
                <Heading marginBottom={4}>{data.project.name}</Heading>
                {data.project.text}

                

                {!data.project.comments ? (<div>No Comments</div>): (
                <Box marginTop="16px" width="100%">
                    <Heading size="md">Comments</Heading>
                    <Divider width="100%" marginTop="4" marginBottom="4"></Divider>
                    {data.project.comments?.map((comment) => (
                    <HStack 
                    align="self-start" 
                    marginBottom="8" 
                    width="100%" 
                   
                    >
                        <HStack width="10%" spacing="2">
               
                        <Avatar  size="sm" src="https://bit.ly/code-beast"  bg="blue.800" color="white"/>
                        <Divider width="100%" bg="red"/>

                        </HStack>
                        

                        <VStack width="100%" spacing="1" align="start">
                        
                            
                            <Flex 
                            width="100%" 
                            align="center" 
                            justify="space-between" >
                                
                                <Text 
                                textColor="gray.600"  
                                fontWeight="semibold"
                                >{comment.user.username}
                                </Text>
                         
                            </Flex>
                        
                            <Text 
                            fontWeight="hairline" 
                            >{comment.text}
                            </Text>

                            <Flex align="center" width="100%" justify="space-between">
                            <Text 
                            fontSize="xx-small">
                                {Date(comment.createdAt)}
                            </Text>

                            <EditDeleteCommentButtons 
                            id={comment.id} 
                            creatorId={comment.user.id}  
                            variant="link"
                            />
                            </Flex>
                           
                            
                           

                       
                        </VStack>
                        
                        
                   
                    </HStack>
                    
                        
                    ))}
                </Box>
                )}

                <Formik
                initialValues={{text: '', id: data.project.id}}
                onSubmit={async (values) => {
                    const {error} = await createComment({text: values.text, id: values.id})
                    if (!error) {
                        router.reload()
                    }
                }}
                
                >
                    {({isSubmitting}) => (
                <Form>
                    <Flex flexDirection="column" alignItems="flex-end">
                    <Flex marginTop={4} align="center" width="100%"> 
                    {/* <Avatar size="sm" bg="blue.900" color="white" marginRight="2" name={meData?.me?.username}></Avatar> */}
                   
                    <InputField 
                    textarea
                    name="text"
                    placeholder="Share your thoughts ..."
                    label=""
                    />
                    </Flex>
           
                    <Button type="submit" 
                         variant="unstyled" 
                         color="blue.700"  
                       
                         marginTop={4} colorScheme="teal" 
                         isLoading={isSubmitting}
                    >
                        Save Comment
                    </Button>
                    </Flex>
                </Form>
            )}



                </Formik>
            </Layout>
        );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Project);