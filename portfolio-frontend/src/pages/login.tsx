import React from 'react'
import { Form, Formik} from 'formik'
import { Box, Button, Flex, Link} from '@chakra-ui/react';
import Wrapper from "../components/Wrapper"
import InputField from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router"
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from "next/link"

interface registerProps {

}


const Login: React.FC<{}> = ({}) => {
    const router = useRouter(); 
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant={'small'}>
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
                        <Link ml="auto" fontSize="xs" >Forgot Password?</Link>
                     </NextLink>
                    </Flex>

                    <Button marginTop={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>Login</Button>
                </Form>
            )}
        </Formik>
        </Wrapper>        
    );
}

export default withUrqlClient(createUrqlClient)(Login);