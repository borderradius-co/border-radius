import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Flex, IconButton, ResponsiveValue, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Project, ProjectSnippetFragment, useVoteMutation } from '../generated/graphql';


interface UpdootSectionProps {
    project: ProjectSnippetFragment
    // direction?: ResponsiveValue<FlexDirection> | undefined
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({project}) => {
    const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading')
    const [, vote] = useVoteMutation()
        return (
            <Flex direction="row" align="center" justify="center" marginTop="4">
                <IconButton 
                colorScheme={project.voteStatus === 1 ? "green" : undefined} 
                variant="link"
                onClick={async() => { 
                    if (project.voteStatus === 1) {
                        return;
                    }
                    setLoadingState('updoot-loading')
                    await vote({
                        projectId: project.id,
                        value: 1,
                    })
                    setLoadingState('not-loading')
                } } 
                isLoading={loadingState==='updoot-loading'}
                aria-label="updoor project" 
                icon={<TriangleUpIcon/>}  />
                <Text> {project.points} </Text>
                <IconButton 
                colorScheme={project.voteStatus === -1 ? "red" : undefined }
                variant="link"
                onClick={async()=> {
                    if (project.voteStatus === -1) {
                        return;
                    }
                    setLoadingState('downdoot-loading')
                    await vote({
                        projectId: project.id,
                        value: -1,
                    })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState==='downdoot-loading'}
                aria-label="downdoot project" 
                icon={<TriangleDownIcon/>}  />
             </Flex>
        );
}