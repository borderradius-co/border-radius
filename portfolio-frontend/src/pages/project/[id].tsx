import { Heading, Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react'
import { Layout } from '../../components/Layout';
import { useProjectQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

export const Project: React.FC<{}> = ({}) => {
    const router = useRouter();
    const intId = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
    const [{data, fetching, error}] = useProjectQuery({
        pause: intId === -1,
        variables: {
            id: intId
        }
    })

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
                <Heading marginBottom={4}>
                    {data.project.name}         
                </Heading>
                {data.project.text}
            </Layout>
        );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Project);