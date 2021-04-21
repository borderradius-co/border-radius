import React from 'react'
import { Form, Formik} from 'formik'
import { Box, Button, Text,Divider, Flex, Heading, Link} from '@chakra-ui/react';
import Wrapper from "../components/Wrapper"
import InputField from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router"
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from "next/link"
import { Layout } from '../components/Layout';

interface registerProps {

}


const Login: React.FC<{}> = ({}) => {
    const router = useRouter(); 
    const [, login] = useLoginMutation();
    return (
        <Layout variant="small">

            <Formik initialValues={{usernameOrEmail: '', password: ''}} onSubmit={async (values, {setErrors}) => {
            const response = await login(values);
            if (response.data?.login.errors) {
               
                setErrors (toErrorMap(response.data.login.errors));
            } else if(response.data?.login.user) {
                if (typeof router.query.next === "string") {
                    router.push(router.query.next)
                } else {
                    router.push("/")
                }
            }
        }}>
            {({isSubmitting}) => (
                <Form>
                    <Heading fontWeight="medium" marginBottom={4} size="lg" >Login to Border Radius</Heading>
                    <Divider marginBottom={8}></Divider>
                    <InputField 
                    name="usernameOrEmail"
                    placeholder="username or email"
                    label="Username or Email"
                    />
                    <Box marginTop={4}>
                   
                    <InputField 
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                    /> 
                    </Box>
                    <Flex marginTop={2}>
                    <NextLink href="/forgot-password"> 
                        <Link color="blue.100" ml="auto" fontSize="xs" >Forgot Password?</Link>
                    </NextLink>
                    </Flex>
                    <Divider marginTop={4} marginBottom={4}></Divider>

                    <Flex marginTop={4}>
                        <Text>Don't have an account?</Text>
                        <NextLink href="/register">
                            <Link color="green.200" marginLeft="2">Sign up now</Link>
                        </NextLink>
                    </Flex>  
                    <Flex align="center" padding="0" marginTop="4">
                        <NextLink href="/">
                        <Button marginLeft="auto"  variant="ghost" marginRight={4}>Cancel</Button>

                        </NextLink>
                        <Button type="submit" variant="outline" color="green.200" isLoading={isSubmitting}>Login</Button>
                    </Flex>

                   
                </Form>
            )}
        </Formik>
        </Layout>
        
   
           
    );
}

export default withUrqlClient(createUrqlClient)(Login);