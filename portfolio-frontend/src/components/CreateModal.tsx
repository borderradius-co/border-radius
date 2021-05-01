import React, {useState} from 'react';
import { Field, Form, Formik} from 'formik';
import { Box,IconButton, Image,Button, Flex, Link, Modal, ModalContent, ModalOverlay, useDisclosure,ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Heading, Divider, useToast, Avatar} from '@chakra-ui/react';
import {InputField} from './InputField';
import { useCreateProjectMutation, useMeQuery } from '../generated/graphql';
import {useRouter} from "next/router";
import NextLink from "next/link";
import {MdAdd} from "react-icons/md";


interface LoginOptionModalProps {
}


const CreateModal: React.FC<{}> = ({}) => {
    const router = useRouter(); 
    const [createProject] = useCreateProjectMutation();
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [toggle, setToggle] = useState(false)
    const toggleIt = () => {
        setToggle(!toggle)
    }  

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
            <ModalContent height="75%">
            
            <ModalHeader fontWeight="thin">
                
            <Avatar marginRight="4" size="sm" src="./images/border-radius.svg"></Avatar>
                Border Radius
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody pb={6}>
      
         
                <Flex flexDirection="row"  align="center" height="100%">
                <Box width="100%" maxWidth="400px" marginX="auto">
                <Formik 
                initialValues={{name: '', text: ''}} 
                onSubmit={async (values) => {
                    const {errors} = await createProject({variables: {input: values}} )
                    if (!errors) {
                        router.reload()
                        router.push("/projects");

                    } 
        }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Heading fontWeight="medium" marginBottom={4} size="lg" >Create New Project</Heading>
                    <Divider marginBottom={8}></Divider>
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

                    <ModalFooter marginTop={16} padding={0}>
                    <Button color="gray.500" variant="ghost" onClick={onClose} marginRight={4}>Cancel</Button>
                    <Button
                    type="submit"
                    variant="outline"
                    _hover={{bg:"green.100"}}
                    color="green.500"
                    fontWeight="hairline" 

                    isLoading={isSubmitting}>Create</Button>
                    </ModalFooter> 
                </Form>
            )}
        </Formik>
        </Box>

                </Flex>
                
            </ModalBody>
            </ModalContent>
                
        </Modal>
        </>
        
    );
}

export default CreateModal;
