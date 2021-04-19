import React from 'react'
import {Box, Button, Flex, Heading, Link} from "@chakra-ui/react"
import NextLink from "next/link"
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
// import { isServer } from '../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
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
            <NextLink href="/login">
                <Link marginRight={2} >Login</Link>
            </NextLink>

            <NextLink href="/register">
                <Link fontWeight="">Register</Link>
            </NextLink>
            </>
        //user is logged in
        } else  {
            body = 
            <Flex>
                <Box marginRight={2} >
                    {data.me.username}
                </Box> 
                <Button onClick={() => {logout()}} variant="link" isLoading={logoutFetching} color="black" fontWeight="medium" >logout</Button>
            </Flex>

        }
        return (
            <Flex zIndex={1} position="sticky" top={0} bg="divar" padding={4} align="center">
                <NextLink href="/">
                    <Link>
                        <Heading size="xs" fontWeight="medium">Border Radius</Heading>
                    </Link>
                </NextLink>
                <Box marginLeft="auto">{body}</Box> 
            </Flex>
        );
}