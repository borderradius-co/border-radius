import { MenuGroup } from '@chakra-ui/menu';
import { Link, MenuItem, Icon } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"
import {MdHome} from "react-icons/md"

interface HomeOptionProps {

}

export const HomeOption: React.FC<HomeOptionProps> = ({}) => {
        return (
        <MenuGroup title="Border Radius">
        <NextLink href="/">
        <Link style={{textDecoration: "none"}} >
        <MenuItem icon={<Icon as={MdHome}>Home</Icon>}>
        Home
        </MenuItem>
        </Link>
        </NextLink>
        </MenuGroup>
      );
}