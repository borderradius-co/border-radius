import { Flex, Image, Text, Link, Box} from '@chakra-ui/react';
import React from 'react'
import { IconButton } from "@chakra-ui/react"
import {MdLaunch} from "react-icons/md"


interface NotionButtonProps {

}

export const NotionButton: React.FC<NotionButtonProps> = ({}) => {
        return (
            <Flex 
            align="center" 
            border="1px"
            _hover={{bg:"#ffffff"}}
            _focus={{bg:"#ffffff"}}
            _active={{bg:"#ffffff"}} 
            borderColor="#E2E2E2" 
            borderRadius="2.5px" 
            boxSizing="border-box" 
            padding="4px"
            justify="space-between"
            >
                <Box>
                    <Image src='./images/notion-logo.svg'/>
                </Box>
                <Link>
                    <Text fontSize="12px" marginLeft="4">View On Notion</Text>
                </Link>
                <IconButton 
                   _hover={{bg:"none"}}
                   _focus={{bg:"none"}}
                size="xs" 
                aria-label="Open New Tab" 
                variant="unstyled"
                icon={<MdLaunch />}
                marginLeft="4"
                
                />
                
            </Flex>

        );



// border: 1px solid #403E44;
// box-sizing: border-box;
// border-radius: 2.5px;
}