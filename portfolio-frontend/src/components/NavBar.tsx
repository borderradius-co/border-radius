import React from 'react'
import {Box, Button, Flex, Text, Heading,useToast, IconButton, Link, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Stack, Divider, Avatar} from "@chakra-ui/react"
import NextLink from "next/link"
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import {useRouter} from "next/router"
import { HamburgerIcon } from '@chakra-ui/icons';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Home from "./Menu"
import {MdExitToApp, MdPerson} from "react-icons/md"
import { isServer } from '../utils/isServer';
import { useApolloClient } from '@apollo/client';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
        const toast = useToast()
        const router = useRouter()
        const apolloClient = useApolloClient()
        const [logout, {loading: logoutFetching}] = useLogoutMutation();
        const {data, loading}= useMeQuery(
        {skip: isServer(),}
);

        // console.log("data: ", data)
        let body = null;

        //data is loading
        if (loading) {
        //user is not logged in
        } else if (!data?.me) {
            body =
            <>
                <LoginModal/>
                <RegisterModal/>
            </>
        //user is logged in
        } else  {
            body = 
            <>
            <Text marginRight="4">{data.me.username}</Text>
            <Button
             onClick={async () => {
                await logout();
                await apolloClient.resetStore()
            }} 
            isLoading={logoutFetching}
            variant="link" 
            _focus={{bg:"none"}} 
            style={{textDecoration: "none"}} 
            color="#8D036F"
            leftIcon={<MdExitToApp/>} fontWeight="hairline" >
            
            Logout
            </Button>
            </>
        }
        return (
          
            <Flex 
            zIndex={1}
            position="sticky" 
            top={0}  
         
            paddingTop={4}
            paddingLeft={4}
            paddingRight={4} 
            bg="white"
            >
                  <Box width="100%">
                    <Flex 
                    flex={1} 
                    m="auto" 
                    align="center" 
                    maxWidth="776px"
                    marginBottom="2"
                    >
                        <NextLink href="/">
                            <Avatar 
                            marginRight="4" 
                            size="sm" 
                            src ="https://drive.google.com/thumbnail?id=16UlYcb9Pl-7safSJYwN_JNvfazfgERTx"
                            />
                        </NextLink>        
                        <Home/>
                        {body}
                    </Flex>
                    <Divider/>
                </Box> 
            </Flex>
           
        );
}


