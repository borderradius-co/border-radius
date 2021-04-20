import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, IconButton, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"
import { useDeleteProjectMutation, useMeQuery } from '../generated/graphql';

interface EditDeleteProjectButtonsProps {
    id: number
    creatorId: number

}

export const EditDeleteProjectButtons: React.FC<EditDeleteProjectButtonsProps> = ({
    id,
    creatorId
}) => {
    const [, deleteProject] = useDeleteProjectMutation()
    const [{data: meData}] = useMeQuery()
    
    if (meData?.me?.id !== creatorId) {
        return null
    }

 
        return (
            
            <Box>
               
                <IconButton 
                marginRight={4}
                onClick={()=> {
                    deleteProject({id})
                    }}
                aria-label="Delete project" 
                icon={<DeleteIcon/>} 
                />
            <NextLink href="/project/edit/[id]" as={`/project/edit/${id}`} >
                <IconButton 
                as={Link}
                aria-label="Update project" 
                icon={<EditIcon/>} />
            </NextLink>
        </Box>
        );
}