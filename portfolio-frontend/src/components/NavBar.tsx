import React from 'react'
import {Box, Button, Flex, Link, useColorModeValue} from "@chakra-ui/react"
import NextLink from "next/link"
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import  {ColorModeSwitcher} from "./colorModeSwitcher"
// import { isServer } from '../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
        const [{fetching: logoutFetching}, logout] = useLogoutMutation();
        const [{data, fetching}] = useMeQuery();


        // console.log("data: ", data)
        let body = null;

        //data is loading
        if (fetching) {
        //user is not logged in
        } else if (!data?.me) {
            body =
            <>
            <NextLink href="/login">
                <Link marginRight={2}>Login</Link>
            </NextLink>

            <NextLink href="/register">
                <Link >Register</Link>
            </NextLink>
            </>
        //user is logged in
        } else  {
            body = 
            <Flex>
                <Box marginRight={2} >
                    {data.me.username}
                </Box> 
                <Button onClick={() => {logout()}} variant="link" isLoading={logoutFetching} color="black">logout</Button>
            </Flex>

        }
        return (
            <Flex bg="divar" zIndex={1} position="sticky" top={0} padding={4}>
                <Box marginLeft="auto">{body}</Box> 
            </Flex>
        );
}