import {useCreateBookMutation, useCreateCommentMutation} from "../../generated/graphql"
import { useIsAuth } from '../../utils/useIsAuth';
import { Form, Formik } from 'formik';
import router from 'next/router';
import InputField from '../../components/InputField';
import {useGetBookFromUrl} from "../../utils/useGetBookFromUrl"
import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Layout } from "../../components/Layout";
import { Box, Breadcrumb, Text, BreadcrumbItem, BreadcrumbLink, Heading, Button } from "@chakra-ui/react";
import NextLink from "next/link"
export const Book: React.FC<{}> = ({}) => {
    useIsAuth()
    const [, createBook] = useCreateBookMutation();
    const [, createComment] = useCreateCommentMutation();
    const [{data, fetching, error}] = useGetBookFromUrl()

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
                <Box>
                    {data.book.comments?.map((comment) => (
                        <>
                        <Text>{comment.text} </Text>
                        <Text> Comment By{comment.user.username}</Text>
                        </>
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
                    <Box marginTop={4}>
                   
                    <InputField 
                    name="text"
                    placeholder="Add Comment Here"
                    label="Add Comment"
                    />
                    </Box>

                    <Button marginTop={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>Add Comment</Button>
                </Form>
            )}



                </Formik>
                
            </Layout>
        );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Book);