import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import {Box, Flex, Heading, Link, Stack, Text, Icon, IconButton, Image, Button, LinkBox } from "@chakra-ui/react"
import { useState } from 'react';
import {MdWbSunny} from "react-icons/md"



const Index = () => {
    const imageColors:any = ['developer', 'developer-dark']
    const [toggle, setToggle] = useState(false)
    const toggleIt = () => {
        setToggle(!toggle)
    }
    return (
        <>
        <Layout>
            <Box maxWidth="500px" width="100%" marginX="auto">
            <Image src= {`./images/${imageColors[`${toggle? '0' : '1'}`]}.svg`} />
            </Box>
            <IconButton aria-label="Image Color" icon={<MdWbSunny/>} marginTop="16px" onClick={toggleIt}>Click me</IconButton>            
            <Stack marginTop="16px" spacing="16px"> 
            <Heading fontWeight="hairline" size="2xl">About</Heading>
            <Heading fontWeight="hairline" size="2xl">Work</Heading>
            <Heading  fontWeight="hairline" size="2xl">Books</Heading>
            <Heading  fontWeight="hairline" size="2xl">Services</Heading>
            <Heading  fontWeight="hairline" size="2xl">Blog</Heading>
            <Heading  fontWeight="hairline" size="2xl">Team</Heading>


            </Stack>
         
            
            <Stack>
            </Stack>
            {/* <Flex>
            <Button>Sign in</Button>
            <Button marginLeft="4">Sign Up</Button>
            </Flex> */}
          
        </Layout>
        </>
    );
};

export default withUrqlClient(createUrqlClient)(Index);
