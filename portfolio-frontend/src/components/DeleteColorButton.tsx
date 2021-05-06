import { AddIcon, DeleteIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons';
import { AlertDialog,Text,useEditableControls, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, IconButton, Link, Menu, MenuButton,Circle, MenuItem, MenuList } from '@chakra-ui/react';
import React, { useState } from 'react'
import NextLink from "next/link"
import {MdMoreHoriz, MdDelete, MdModeEdit, MdMoreVert} from "react-icons/md"
import { useDeleteColorMutation, useMeQuery } from '../generated/graphql';
import {useRouter} from "next/router";


interface DeleteColorButtonProps {
    id: number
    userId?: number
    variant?: string
    
}


export const DeleteColorButton: React.FC<DeleteColorButtonProps> = ({
    id,
    userId: userId,
    variant='outline'
   
}) => {
    const router = useRouter(); 
    const [deleteColor] = useDeleteColorMutation()
    const {data: meData} = useMeQuery()
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef<HTMLButtonElement>(null);

    
    if (meData?.me?.id !== userId) {
        return null
    }


 
        return (
            <>
            <IconButton
                        aria-label="Delete Comment"
                        fontWeight="hairline" 
                        _hover={{bg:"#ffdcdc", borderRadius:'50'}}
                        _focus={{bg:"none"}}
                        _active={{bg:"#ffdcdc", borderRadius:'50'}}
                        icon={<MdDelete/>}
                        marginLeft="2"
                        borderColor='transparent'
                        variant={variant === 'outline' ? 'outline' : 'none'}
                        onClick={() => setIsOpen(true)}
            />
       
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete
              </AlertDialogHeader>
  
              <AlertDialogBody>
                      <Box>
                      <Text>Are you sure you want to delete this color?</Text>

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
                    deleteColor({variables: {id}, update: (cache) => {
                      cache.evict({id: 'Color' + id})
                    }})
                    router.reload()
                    
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