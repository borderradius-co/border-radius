import React from 'react';
import {  Form, Formik} from 'formik';
import { Box, Button, Flex, Link, Modal, ModalContent, ModalOverlay, useDisclosure,ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Heading, Divider, Avatar} from '@chakra-ui/react';
import Wrapper from "./Wrapper";
import {InputField} from './InputField';
import { MeDocument, MeQuery, useLoginMutation, useMeQuery } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router";
import NextLink from "next/link";
import {MdLockOpen} from "react-icons/md";

interface LoginOptionModalProps {
}


const LoginModal: React.FC<{}> = ({}) => {
    const router = useRouter(); 
    const id = "username-toast"
    const callback = () => alert(`You are logged in as ${data?.me?.username}`)


    const [login] = useLoginMutation();
    const { isOpen, onClose, onOpen } = useDisclosure()
    const {data, loading} = useMeQuery()

    return (
        <>
        <Button  variant="link" fontWeight="hairline" _focus={{bg:"none"}} style={{textDecoration: "none"}} onClick={onOpen} leftIcon={<MdLockOpen/>} marginRight="4" >Login</Button>
        <Modal size="6xl" blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent height="2xl">
            <ModalHeader  fontWeight="thin">
            <Avatar marginRight="4" size="sm" src="./images/border-radius.svg"></Avatar>


                Border Radius
                
                </ModalHeader>

            <ModalCloseButton />
            <ModalBody pb={6}>
                <Wrapper variant="small">
                <Formik initialValues={{usernameOrEmail: '', password: ''}} onSubmit={async (values, {setErrors}) => {
            const response = await login({variables: values,  update:(cache, {data}) => {
                cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        __typename: 'Query',
                        me: data?.login.user,
                    }
                }),
                cache.evict({fieldName: "projects:{}"})
        }});
                if (response.data?.login.errors) {
                
                    setErrors (toErrorMap(response.data.login.errors));
                } else if(response.data?.login.user) {
                    if (typeof router.query.next === "string") {
                        router.push(router.query.next)

                    } else {
                        router.push("/projects")
                        // const callback = () => alert(`Signed in as ${data!.me!.username}`)
                        // setTimeout(callback, 5000)  

                   

                    }
                  
                }


             
            }}>
            {({isSubmitting}) => (
                <Form>
                    <Heading fontWeight="medium" marginBottom={4} size="lg" >Login to Border Radius</Heading>
                    <Divider marginBottom={8}></Divider>
                  
                    <InputField 
                    name="usernameOrEmail"
                    placeholder=""
                    label="Username or Email"
                    />
                    <Box marginTop={4}>
                   
                    <InputField 
                    name="password"
                    placeholder=""
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

                    <ModalFooter marginTop={8} padding={0}>
                    <Button color="gray.500" variant="ghost" onClick={onClose} marginRight={4}>Cancel</Button>
                    <Button
                    type="submit"
                    variant="outline"
                    color="#8D036F"
                    borderColor="#8D036F"
                    isLoading={isSubmitting}>Login</Button>
                    </ModalFooter> 
                         
                </Form>
            )}
            </Formik>
            </Wrapper>
            </ModalBody>
            </ModalContent>
                
        </Modal>
        </>
        
    );
}

export default LoginModal;
