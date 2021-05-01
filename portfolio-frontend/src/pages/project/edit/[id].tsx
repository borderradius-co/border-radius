import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react'
import {InputField} from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { useProjectQuery, useUpdateProjectMutation } from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetIntId } from '../../../utils/useGetIntId';
import { useGetProjectFromUrl } from '../../../utils/useGetProjectFromUrl';
import { withApollo } from '../../../utils/withApollo';



const UpdateProject = ({}) => {
        const router = useRouter()
        const intId = useGetIntId()
        const {data, loading} = useProjectQuery({
            skip: intId === -1,
            variables: {
                id: intId
            }
        });
        const [updateProject] = useUpdateProjectMutation()

        if (loading) {
            return (
                <Layout>
                    <div>loading...</div>
                </Layout>
            )
        }

        if (!data?.project) {
            return (
                <Layout>
                    <Box>Could not find post</Box>
                </Layout>
            )
        }

        return (<Layout variant="small">
        <Formik 
        initialValues={{name: data.project.name, text: data.project.text}} 
        onSubmit={async (values) => {
            // const {error} = await updateProject({input: values})
            // if (!error) {
            //     router.push("/");
            // } 
            await updateProject( {variables: { id: intId, ...values}})
            router.back()
        }}
        >
        {({isSubmitting}) => (
        <Form>
            <InputField 
            name="name"
            placeholder="name of this project"
            label="Name"
            />
            <Box marginTop={4}>
           
            <InputField 
            textarea
            name="text"
            placeholder="details about this project"
            label="Body"
            type="textarea"
            />
            </Box>

            <Button 
                marginTop={4} 
                type="submit" 
                colorScheme="teal" 
                isLoading={isSubmitting}>
                    Update Project
                </Button>
        </Form>
    )}
</Formik>


    </Layout>);
}

export default withApollo({ssr: false})(UpdateProject);
