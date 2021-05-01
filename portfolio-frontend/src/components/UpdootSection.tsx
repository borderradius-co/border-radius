import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Flex, IconButton, ResponsiveValue, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Project, ProjectSnippetFragment,VoteMutation, useVoteMutation } from '../generated/graphql';
import gql from "graphql-tag";
import { ApolloCache } from "@apollo/client";

interface UpdootSectionProps {
    project: ProjectSnippetFragment
    // direction?: ResponsiveValue<FlexDirection> | undefined
}

const updateAfterVote = (
    value: number,
    projectId: number,
    cache: ApolloCache<VoteMutation>
  ) => {
    const data = cache.readFragment<{
      id: number;
      points: number;
      voteStatus: number | null;
    }>({
      id: "Project:" + projectId,
      fragment: gql`
        fragment _ on Project {
          id
          points
          voteStatus
        }
      `,
    });
    if (data) {
        if (data.voteStatus === value) {
        return;
        }
        const newPoints =
        (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
        cache.writeFragment({
        id: "Project:" + projectId,
        fragment: gql`
            fragment __ on Project {
            points
            voteStatus
            }
        `,
        data: { points: newPoints, voteStatus: value },
        });
    }
};
  

export const UpdootSection: React.FC<UpdootSectionProps> = ({project}) => {
    const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading')
    const [vote] = useVoteMutation()
        return (
            <Flex direction="row" align="center" justify="center" marginTop="4">
                <IconButton 
                 _hover={{bg:"none"}}
                 _focus={{bg:"none"}}
                colorScheme={project.voteStatus === 1 ? "green" : undefined} 
                variant="link"
                onClick={async() => { 
                    if (project.voteStatus === 1) {
                        return;
                    }
                    setLoadingState('updoot-loading')
                    await vote({variables: {
                        projectId: project.id,
                        value: 1,
                    },
                    update: (cache) => updateAfterVote(1, project.id, cache),

                })
                    setLoadingState('not-loading')
                } } 
                isLoading={loadingState==='updoot-loading'}
                aria-label="updoor project" 
                icon={<TriangleUpIcon/>}  />
                <Text> {project.points} </Text>
                <IconButton 
                 _hover={{bg:"none"}}
                 _focus={{bg:"none"}}
                colorScheme={project.voteStatus === -1 ? "red" : undefined }
                variant="link"
                onClick={async()=> {
                    if (project.voteStatus === -1) {
                        return;
                    }
                    setLoadingState('downdoot-loading')
                    await vote({
                        variables: {
                            projectId: project.id,
                            value: -1,
                        },
                        update: (cache) => updateAfterVote(-1, project.id, cache),
                        
                    })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState==='downdoot-loading'}
                aria-label="downdoot project" 
                icon={<TriangleDownIcon/>}  />
             </Flex>
        );
}