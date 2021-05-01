import React from 'react'
import { Form, Formik} from 'formik'
import Wrapper from "../components/Wrapper"
import {InputField} from '../components/InputField';
import { Box, Button, Text,Divider, Flex, Heading, Link, useToast} from '@chakra-ui/react';
import { useLoginMutation, useMeQuery } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router"
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from "next/link"
import { Layout } from '../components/Layout';
import { withApollo } from '../utils/withApollo';

interface registerProps {

}


const Login: React.FC<{}> = ({}) => {
    const router = useRouter(); 
    const [login] = useLoginMutation();
    const {data, loading}= useMeQuery()
    const toast = useToast()
    return (
        <Layout variant="small">

            <Formik initialValues={{usernameOrEmail: '', password: ''}} onSubmit={async (values, {setErrors}) => {
            const response = await login({variables: values});
            if (response.data?.login.errors) {
               
                setErrors (toErrorMap(response.data.login.errors));
            } else if(response.data?.login.user) {
                if (typeof router.query.next === "string") {
                    // There is a bug here when attempting to push to project/id
                    // router.push(router.query.next)
                    router.push("/projects")
                } else {
                    router.push("/projects")
                }
            }
        }}>
            {({isSubmitting}) => (
                <Form>
                    <Heading fontWeight="medium" marginBottom={4} size="lg" >Login to Border Radius</Heading>
                    <Divider marginBottom={8}></Divider>
                    <InputField 
                    name="usernameOrEmail"
                    label="Username or Email"
                    />
                    <Box marginTop={4}>
                   
                    <InputField 
                    name="password"
                    label="Password"
                    type="password"
                    /> 
                    </Box>
                    <Flex marginTop={2}>
                    <NextLink href="/forgot-password"> 
                        <Link color="blue" ml="auto" fontSize="xs" >Forgot Password?</Link>
                    </NextLink>
                    </Flex>
                    <Divider marginTop={4} marginBottom={4}></Divider>

                    <Flex marginTop={4}>
                        <Text>Don't have an account?</Text>
                        <NextLink href="/register">
                            <Link color="#8D036F" marginLeft="2">Sign up now</Link>
                        </NextLink>
                    </Flex>  
                    <Flex align="center" padding="0" marginTop="4">
                        <NextLink href="/">
                        <Button marginLeft="auto"  variant="ghost" marginRight={4}>Cancel</Button>

                        </NextLink>
                        <Button
                         type="submit" 
                         variant="outline" 
                         color="#8D036F"  
                         borderColor="#8D036F"
                         isLoading={isSubmitting}>Login</Button>
                    </Flex>

                   
                </Form>
            )}
        </Formik>
        </Layout>
        
   
           
    );
}

export default withApollo({ssr: false})(Login);