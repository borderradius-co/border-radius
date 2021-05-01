import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React from 'react';
import {InputField} from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { toErrorMap } from '../utils/toErrorMap';
import login from './login';
import NextLink from "next/link"
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import {useForgotPasswordMutation} from "../generated/graphql"
import { useState } from 'react';
import { withApollo } from '../utils/withApollo';

const ForgotPassword: React.FC<{}> = ({}) => {
        const [complete, setComplete] = useState(false);
        const [forgotPassword] = useForgotPasswordMutation()
        return (
            <Wrapper variant={'small'}>
            <Formik initialValues={{email: ''}} onSubmit={async (values) => {
                await forgotPassword({variables:values} )
                setComplete(true)
              
            }}
            >
                {({isSubmitting}) => complete? <Box>You should be recieving an email shortly</Box> : (
                    <Form>
                        <InputField 
                        name="email"
                        placeholder="Enter your email"
                        label="Email"
                        type="email"
                        />
                        <Box marginTop={4}>                
                        </Box>
                       
    
                        <Button marginTop={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>Forgot Password</Button>
                    </Form>
                )}
            </Formik>
            </Wrapper>        
        );
}

export default withApollo({ssr: false})(ForgotPassword);