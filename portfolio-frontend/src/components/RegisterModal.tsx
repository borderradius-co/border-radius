import React from 'react'
import { Form, Formik} from 'formik'
import { Box,Text,Avatar, Button, Divider, Flex, Heading, Link, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, ModalFooter, useToast} from '@chakra-ui/react';
import Wrapper from "./Wrapper"
import {InputField} from './InputField';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router"
import { MdFingerprint } from "react-icons/md";
import NextLink from "next/link"

interface RegisterOptionModalProps {

}



const RegisterOptionModal: React.FC<RegisterOptionModalProps> = ({}) => {
    const router = useRouter(); 
    const [register] = useRegisterMutation();
    const { isOpen, onClose, onOpen } = useDisclosure()
    const toast = useToast()
    return (
        <>
        <Button 
        variant="link" 
        _focus={{bg:"none"}} 
        style={{textDecoration: "none"}} 
        color="#8D036F"
        leftIcon={<MdFingerprint/>} fontWeight="hairline" onClick={onOpen}>Sign up</Button>
        <Modal size="6xl" blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} >
            <ModalOverlay/>
            <ModalContent height="2xl">
                <ModalHeader fontWeight="thin" >
                <Avatar marginRight="4" size="sm" src="./images/border-radius.svg"></Avatar>

                    Border Radius
                    
                    </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                <Wrapper variant={'small'}>
        <Formik initialValues={{email: '',username: '', password: ''}} onSubmit={async (values, {setErrors}) => {
            const response = await register({variables:  {options: values},
                update:(cache, {data}) => {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            __typename: 'Query',
                            me: data?.register.user,
                        }
                    })
            }});
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
                    <Divider marginTop={8} marginBottom={4}></Divider>

                    <Flex marginTop={4}>
                        <Text>Already have an account?</Text>
                        <NextLink href="/login">
                            <Link color="#8D036F" marginLeft="2">Sign in instead</Link>
                        </NextLink>
                    </Flex>
                    <ModalFooter marginTop={8} padding={0}>
                    <Button variant="ghost" color="gray.500"  onClick={onClose} marginRight={4}>Cancel</Button>
                    <Button 
                    type="submit"
                    variant="outline"
                    color="#8D036F"
                    borderColor="#8D036F"
                    isLoading={isSubmitting}>Sign up</Button>
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

export default RegisterOptionModal;