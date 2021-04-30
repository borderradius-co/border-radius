import {useCreateBookMutation, useCreateCommentMutation} from "../../generated/graphql"
import { useIsAuth } from '../../utils/useIsAuth';
import { Form, Formik } from 'formik';
import router from 'next/router';
import {InputField} from '../../components/InputField';
import {useGetBookFromUrl} from "../../utils/useGetBookFromUrl"
import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Layout } from "../../components/Layout";
import { Box, Flex,Breadcrumb, Text, BreadcrumbItem, BreadcrumbLink, Heading, Button, Avatar, VStack, HStack, Divider, IconButton } from "@chakra-ui/react";
import NextLink from "next/link"
import { useMeQuery } from "../../generated/graphql";
import {MdMoreVert} from "react-icons/md"

export const Book: React.FC<{}> = ({}) => {
    useIsAuth()
    const [, createBook] = useCreateBookMutation();
    const [, createComment] = useCreateCommentMutation();
    const [{data, fetching, error}] = useGetBookFromUrl()
    const [{data: meData, fetching: meFetching}] = useMeQuery()

    if (fetching) {
        return (
            <Layout> 
                <div>loading...</div>
            </Layout>
        )
    }

    if (error) {
        return (
            <div> {error.message} </div>
        )
    }

    if (!data?.book) {
        return (
            <Layout>
                <Box>Could not find any books</Box>
            </Layout>
        )
    }
   
        return (
            <Layout>
                <Breadcrumb marginBottom="24px">
                <BreadcrumbItem>
                <NextLink href="/books">
                    <BreadcrumbLink> Books </BreadcrumbLink>
                </NextLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{data.book.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                </Breadcrumb>
            
                <Heading marginBottom={4}>{data.book.title}</Heading>
                {!data.book.comments ? (<div>No Comments</div>): (
                <Box width="100%">
                    <Heading size="md">Comments</Heading>
                    <Divider width="100%" marginTop="4" marginBottom="4"></Divider>
                    {data.book.comments?.map((comment) => (
                    <HStack align="baseline" marginBottom="8" width="100%">
                        <Avatar  size="xs" name={comment.user.username} bg="blue.800" color="white"/>

                        <VStack width="100%" spacing="1" align="start">
                            <Flex width="100%" align="center" justify="space-between" >
                            <Text  fontWeight="semibold" >{comment.user.username}</Text>
                         
                            </Flex>

                            <Text fontWeight="hairline" >{comment.text}</Text>
                            {/* <Text fontSize="xx-small">{Date(comment.createdAt)}</Text> */}

                       
                        </VStack>
                        <IconButton 
                            _hover={{bg:"none"}}
                            _focus={{bg:"none"}}
                            variant="unstyled"  
                            aria-label="More" 
                            icon={<MdMoreVert/>} 
                            />

                        

                    </HStack>
                        
                    ))}
                </Box>
                )}

                <Formik
                initialValues={{text: '', id: data.book.id}}
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

export default withUrqlClient(createUrqlClient, {ssr: true})(Book);