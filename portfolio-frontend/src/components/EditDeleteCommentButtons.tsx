import { AddIcon, DeleteIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons';
import { AlertDialog,Text,useEditableControls, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, IconButton, Link, Menu, MenuButton,Circle, MenuItem, MenuList } from '@chakra-ui/react';
import React, { useState } from 'react'
import NextLink from "next/link"
import {MdMoreHoriz, MdDelete, MdModeEdit, MdMoreVert} from "react-icons/md"
import { useDeleteCommentMutation, useMeQuery } from '../generated/graphql';
import {useRouter} from "next/router";


interface EditDeleteCommentButtonsProps {
    id: number
    creatorId?: number
    name?: string   
    variant?: string
}

export const EditDeleteCommentButtons: React.FC<EditDeleteCommentButtonsProps> = ({
    id,
    creatorId,
    name,
    variant='outline'
}) => {
    const router = useRouter(); 
    const [, deleteComment] = useDeleteCommentMutation()
    const [{data: meData}] = useMeQuery()
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()

    
    if (meData?.me?.id !== creatorId) {
        return null
    }


 
        return (
            <>
            <Button
             
            aria-label="Delete Comment" 
            icon={<MdDelete/>}
            fontSize="12px"
            color="red.600"
            _hover={{bg:'none'}}
            _focus={{bg:'none'}}
            _active={{bg:'none'}}
            variant={variant === 'link' ? 'link' : 'none'}
            borderColor="#e1e1e1"
            onClick={() => setIsOpen(true)}
            >Delete</Button>
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
                      <Text>Are you sure you want to delete this comment?</Text>

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
                    deleteComment({id})
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