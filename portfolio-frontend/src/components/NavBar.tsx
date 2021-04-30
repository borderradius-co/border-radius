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
// import { isServer } from '../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
        const toast = useToast()
        const router = useRouter()
        const [{fetching: logoutFetching}, logout] = useLogoutMutation();
        const [{data, fetching}] = useMeQuery(
            // {pause: isServer(),}
);

        // console.log("data: ", data)
        let body = null;

        //data is loading
        if (fetching) {
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
                router.reload()
            }} 
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
          
            <Flex zIndex={1} position="sticky" top={0}  p={4} bg="white">
                  <Box width="100%">
                  <Flex flex={1} m="auto" align="center"  maxWidth="800px">
                <NextLink href="/">
                    <Avatar marginRight="4" size="sm" src ="./images/border-radius.svg"/>
                </NextLink>
                
                    
                <Home/>
                {body}
                   
                </Flex>
                <Divider></Divider> 


                </Box> 
               
            </Flex>
           
        );
}


