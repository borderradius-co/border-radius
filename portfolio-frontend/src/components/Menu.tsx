import { MenuGroup } from '@chakra-ui/menu';
import { Link, MenuItem, Icon, Button, Flex, IconButton, MenuButton, Menu, MenuList } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"
import {MdMenu, MdHome} from "react-icons/md"
import { route } from 'next/dist/next-server/server/router';
import { AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons';

interface HomeOptionProps {

}

const HomeButton: React.FC<HomeOptionProps> = ({}) => {
        return (
            <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Menu"
                icon={<MdMenu/>}
                marginRight="auto"
                variant="unstyled"
                _hover={{bg:"none"}}
                _focus={{bg:"none"}}
                padding="1"
            />
            <MenuList>
                <NextLink href="/">
                    <MenuItem icon={<MdHome/>}>
                    Home
                    </MenuItem>
                </NextLink>
                
                <MenuGroup title="Work">
                </MenuGroup>
                <MenuItem icon={<AddIcon />} >
                    Projects
                </MenuItem>
                <MenuItem icon={<ExternalLinkIcon />} >
                    Tutorials
                </MenuItem>
                <MenuItem icon={<RepeatIcon />} >
                Open Closed Tab
                </MenuItem>
                <MenuItem icon={<EditIcon />}>
                Open File...
                </MenuItem>
            </MenuList>
            </Menu>







            // <NextLink href="/">
            //     <Button marginRight="auto" variant="link" _focus={{bg:"none"}} style={{textDecoration: "none"}} leftIcon={<MdHome/>} >Border Radius</Button>
            // </NextLink>
      );
}

export default HomeButton