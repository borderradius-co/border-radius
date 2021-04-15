import { Box, Button, Link,Flex } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import { useChangePasswordMutation } from "../../generated/graphql";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import NextLink from "next/link"

const ChangePassword: NextPage< {token: string} > = () => {
        const router = useRouter();
        // console.log(router.query)
        const [, changePassword] = useChangePasswordMutation();
        const [tokenError, setTokenError] = useState();
        return (
            <Wrapper variant={'small'}>
            <Formik 
                initialValues={{newPassword:''}} 
                onSubmit={async (values, {setErrors}) => {
                    const response = await changePassword({
                        newPassword: values.newPassword, 
                        token: typeof router.query.token === "string" ? router.query.token : "",
                    });
                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(response.data.changePassword.errors)
                        if ('token' in errorMap) {
                            setTokenError(errorMap.token)
                        }
                        setErrors(errorMap);
                    } else if (response.data?.changePassword.user) {
                        router.push("/")
                    }
            }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <InputField 
                        name="newPassword"
                        placeholder="new password"
                        label="New Password"
                        type="password"
                        />
                        {tokenError? (
                            <Flex>
                                <Box marginRight={2} color="red"> {tokenError} </Box> 
                                <NextLink href="/forgot-password"> 
                                    <Link>Try Again</Link>
                                </NextLink>
                            </Flex>
                          
                        ) 
                    
                        : null}
                        <Button marginTop={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>Change Password</Button>
                    </Form>
                )}
            </Formik>
            </Wrapper>  

        );
}

// ChangePassword.getInitialProps = ({query}) => {
//     return {token: query.token as string}
// }

export default withUrqlClient(createUrqlClient)(ChangePassword);