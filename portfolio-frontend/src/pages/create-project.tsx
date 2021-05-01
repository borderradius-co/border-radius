import { Box, Flex, Link, Button, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/router';
import {useRouter} from "next/router"
import React, { useEffect } from 'react'
import {InputField} from '../components/InputField';
import { Layout } from '../components/Layout';
import Wrapper from '../components/Wrapper';
import {useCreateProjectMutation} from "../generated/graphql"
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';

// import { toErrorMap } from '../utils/toErrorMap';

const CreateProject: React.FC<{}> = ({}) => {
        useIsAuth();
        const [createProject] = useCreateProjectMutation();
        const toast = useToast()
        return (
            <Layout variant="small">
                <Formik 
                initialValues={{name: '', text: ''}} 
                onSubmit={async (values) => {
                    const {errors} = await createProject({variables: {input: values}})
                    if (!errors) {
                        router.push("/projects");
                    } 
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
                    isLoading={isSubmitting}
                    >
                        Create Project
                    </Button>
                </Form>
            )}
        </Formik>
 

            </Layout>

        
        );
}

export default withApollo({ssr: false})(CreateProject);