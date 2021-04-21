import React from 'react'
import { Form, Formik} from 'formik'
import { Box, Button, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure} from '@chakra-ui/react';
import Wrapper from "./Wrapper"
import InputField from './InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router"
import { MdFingerprint } from "react-icons/md";

interface registerProps {

}



const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter(); 
    const [, register] = useRegisterMutation();
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
        <>
        <MenuItem icon={<MdFingerprint/>} onClick={onOpen}>Register</MenuItem>
        <Modal size="6xl" blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} >
            <ModalOverlay/>
            <ModalContent bg="gray.900" height="2xl">
                <ModalHeader fontWeight="thin" >Welcome</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                <Wrapper variant={'small'}>
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
                    <Button marginTop={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>Register</Button>
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

export default Register;

