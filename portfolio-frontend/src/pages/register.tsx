import React from 'react'
import { Form, Formik} from 'formik'
import { Box, Button, Text, Link,Divider, Flex, Heading, useToast} from '@chakra-ui/react';
import Wrapper from "../components/Wrapper"
import InputField from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router"
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';
import NextLink from "next/link"

interface registerProps {

}



const Register: React.FC<registerProps> = ({}) => {
    const toast = useToast( )
    const router = useRouter(); 
    const [, register] = useRegisterMutation();
    return (
        <Layout>
        <Formik initialValues={{email: '',username: '', password: ''}} onSubmit={async (values, {setErrors}) => {
            const response = await register({options: values});
            if (response.data?.register.errors) {
               
                setErrors (toErrorMap(response.data.register.errors));
            } else if(response.data?.register.user) {
                router.push("/")
            }
        }}>
            {({isSubmitting}) => (
                <Form>
                    <Heading fontWeight="medium" marginBottom={4} size="lg" >Welcome to Border Radius</Heading>
                    <Divider marginBottom={8}></Divider>
                    <InputField 
                    name="username"
                    placeholder="username"
                    label="Username"
                    />
                    <Box marginTop={4}>
                    
                    <InputField 
                    name="email"
                    placeholder="email"
                    label="Email"
                    />
                    </Box>
                  
                    <Box marginTop={4}>
                    <InputField 
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                    />
                    </Box>
                    <Flex marginTop={4}>
                        <Text>Already have an account?</Text>
                        <NextLink href="/login">
                            <Link color="green.200" marginLeft="2">Sign in instead</Link>
                        </NextLink>
                    </Flex>  
                    <Flex align="center" padding="0" marginTop="4">
                        <NextLink href="/">
                        <Button marginLeft="auto"  variant="ghost" marginRight={4}>Cancel</Button>

                        </NextLink>
                        <Button
                        onClick={async () => {
                            toast({
                                title:`You have successfully signed up`,
                                variant:"solid",
                                isClosable:true,
                                status:"success",
                                position:"top-right"
                            })
                        }}  
                        type="submit" 
                        variant="outline" 
                        color="green.200" 
                        isLoading={isSubmitting}>Sign up</Button>
                    </Flex>

                </Form>
            )}
        </Formik>
        </Layout>
      
    );
}

export default withUrqlClient(createUrqlClient)(Register);