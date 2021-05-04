import { MenuGroup } from '@chakra-ui/menu';
import { Link, MenuItem, Icon, Button, Flex, IconButton, MenuButton, Menu, MenuList } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"
import {MdMenu, MdHome,MdColorize, MdLibraryBooks,MdStyle,MdBrightness1, MdContentCut} from "react-icons/md"

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
                    <NextLink href="/books">
                        <MenuItem icon={<MdLibraryBooks />} >
                            Books
                        </MenuItem>    
                    </NextLink>
                    <NextLink href="/projects">
                        <MenuItem icon={<MdStyle />} >
                            Projects
                        </MenuItem>    
                    </NextLink>
                </MenuGroup>

                <NextLink href="/about">
                    <MenuItem icon={<MdBrightness1 />} >
                        About
                    </MenuItem>    
                </NextLink>

                  <NextLink href="/colors">
                    <MenuItem icon={<MdColorize />} >
                        Colors
                    </MenuItem>    
                </NextLink>
               
            </MenuList>
            </Menu>







            // <NextLink href="/">
            //     <Button marginRight="auto" variant="link" _focus={{bg:"none"}} style={{textDecoration: "none"}} leftIcon={<MdHome/>} >Border Radius</Button>
            // </NextLink>
      );
}

export default HomeButton