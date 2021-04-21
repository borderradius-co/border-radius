import React from 'react'
import {Box, Button, Flex, Text, Heading, Link, useDisclosure,Modal, ModalContent, ModalOverlay, Menu, MenuButton, IconButton, MenuList, MenuItem, Spacer, MenuGroup, Icon,} from "@chakra-ui/react"
import NextLink from "next/link"
import { useMeQuery, useLogoutMutation, useLoginMutation } from "../generated/graphql";
import {useRouter} from "next/router"
import Wrapper from "../components/Wrapper"
import { toErrorMap } from '../utils/toErrorMap';
import { Form, Formik} from 'formik'
import InputField from '../components/InputField';
import LoginOption from './LoginOption';
import { AddIcon, HamburgerIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { MdPerson, MdLockOpen, MdHome } from "react-icons/md";
import RegisterOption from './RegisterOption';
import { HomeOption } from './HomeOptions';


// import { isServer } from '../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
        const router = useRouter()
        const {onOpen, isOpen, onClose} = useDisclosure()
        const [, login] = useLoginMutation();
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
                <MenuGroup title="Account">
                    <LoginOption/>
                    <RegisterOption/>
                </MenuGroup>
              
         
        //user is logged in
        } else  {
            body = 
           
            
                <MenuGroup title={data.me.username}>
                    {/* <MenuItem
                    _hover={{ bg:"none"}}
                    icon={<Icon as={MdPerson}></Icon>}>
                        {data.me.username}
                    </MenuItem> */}
                    <MenuItem 
                    icon={<Icon as={MdLockOpen}></Icon>}
                    onClick={async () => {
                        await logout();
                        router.reload()
                    }}>
                        Logout
                    </MenuItem>
                </MenuGroup>  
    

        }
        return (

            
            <Flex zIndex={1} position="sticky" top={0} padding={4}  >
                <Flex>
                <Menu>
                    <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    variant="unstyled"
                    icon={<HamburgerIcon/>}
                    _focus={{bg:"none"}}
                    />
                    <MenuList>
                    <HomeOption/>
                    {body}  
                    </MenuList> 
                </Menu> 
                </Flex>
               
              
            </Flex>

        );
}




