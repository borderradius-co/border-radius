import React from 'react';
import { Field, Form, Formik} from 'formik';
import { Box, Image,Button, Flex, Link, Modal, ModalContent, ModalOverlay, useDisclosure,ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Heading, Divider, useToast, Avatar} from '@chakra-ui/react';
import Wrapper from "./Wrapper";
import InputField from './InputField';
import { useCreateProjectMutation, useMeQuery } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router";
import NextLink from "next/link";
import {MdAdd} from "react-icons/md";

interface LoginOptionModalProps {
}


const CreateModal: React.FC<{}> = ({}) => {
    const router = useRouter(); 
    const [, createProject] = useCreateProjectMutation();
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [{data, fetching}] = useMeQuery()
    const toast = useToast()

    return (
        <>
        <Button  
        variant="outline"  
        fontWeight="hairline" 
        _focus={{bg:"none"}} 
        _hover={{bg:"green.100"}}
        style={{textDecoration: "none"}} 
        onClick={onOpen} 
        rightIcon={<MdAdd/>} 
        color="green.500"
        >Create New
        </Button>
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
                <Formik 
                initialValues={{name: '', text: ''}} 
                onSubmit={async (values) => {
                    const {error} = await createProject({input: values})
                    if (!error) {
                        router.reload()
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

                    <ModalFooter marginTop={8} padding={0}>
                    <Button color="gray.500" variant="ghost" onClick={onClose} marginRight={4}>Cancel</Button>
                    <Button
                    type="submit"
                    variant="outline"
                    color="#8D036F"
                    borderColor="#8D036F"
                    isLoading={isSubmitting}>Create</Button>
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

export default CreateModal;
