import { Heading, Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react'
import { EditDeleteProjectButtons } from '../../components/EditDeleteProjectButtons';
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetProjectFromUrl } from '../../utils/useGetProjectFromUrl';

export const Project: React.FC<{}> = ({}) => {
    const [{data, fetching, error}] = useGetProjectFromUrl()

    if (fetching) {
        return (
            <Layout> 
                <div>loading...l</div>
            </Layout>
        )
    }

    if (error) {
        return (
            <div> {error.message} </div>
        )
    }

    if (!data?.project) {
        return (
            <Layout>
                <Box>Could not find post</Box>
            </Layout>
        )
    }
   
        return (
            <Layout>
                <Heading marginBottom={4}>{data.project.name}</Heading>
                {data.project.text}
                <EditDeleteProjectButtons id={data.project.id} creatorId={data.project.creator.id } />
            </Layout>
        );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Project);