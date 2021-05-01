import { AddIcon, DeleteIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons';
import { AlertDialog,Text, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, IconButton, Link, Menu, MenuButton,Circle, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"
import {MdMoreHoriz, MdDelete, MdModeEdit, MdMoreVert} from "react-icons/md"
import { useDeleteProjectMutation, useMeQuery } from '../generated/graphql';

interface EditDeleteProjectButtonsProps {
    id: number
    creatorId?: number
    name?: string   
    variant?: string
}



export const EditDeleteProjectButtons: React.FC<EditDeleteProjectButtonsProps> = ({
    id,
    creatorId,
    name,
    variant='outline'
}) => {
    const [deleteProject] = useDeleteProjectMutation()
    const {data: meData} = useMeQuery()
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    
    if (meData?.me?.id !== creatorId) {
        return null
    }
        return (
            <>
            <Menu>
              
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<MdMoreVert />}
                _hover={{bg:"#ffdcdc", borderRadius:'50'}}
                _focus={{bg:"none"}}
                _active={{bg:"#ffdcdc", borderRadius:'50'}}
                variant={variant === 'outline' ? 'outline' : 'none'}
                borderColor='transparent'
              />
             
              <MenuList>
              <NextLink 
              href="/project/edit/[id]" 
              as={`/project/edit/${id}`} 
              >
                <MenuItem icon={<MdModeEdit />}>
                  Edit 
                </MenuItem>
                </NextLink>
                <MenuItem  
                color="red" 
                icon={<MdDelete />} 
                onClick={() => setIsOpen(true)}
                >
                  Delete 
                </MenuItem>
             
              </MenuList>
            </Menu>
            
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete {name}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                      <Box>
                        <Text>
                          Are you sure you want to delete {name}?
                        </Text>
                      </Box>
                
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button 
                ref={cancelRef} 
                onClick={onClose}
                _hover={{bg:"none"}}
                _focus={{bg:"none"}}
                variant="link"
                >
                  No
                </Button>
                <Button 
                variant="link"
                colorScheme="red" 
                _hover={{bg:"none"}}
                _focus={{bg:"none"}}
                onClick={()=> {
                    deleteProject({variables: {id}, update: (cache) => {
                      cache.evict({id: 'Project' + id})
                    }})
                }} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        </>
        );
}
