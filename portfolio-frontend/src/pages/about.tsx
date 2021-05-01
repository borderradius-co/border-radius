import { Heading } from '@chakra-ui/react';
import React from 'react'
import { Layout } from '../components/Layout';
import { withApollo } from '../utils/withApollo';

interface aboutProps {

}

const About: React.FC<aboutProps> = ({}) => {
        return (
            <Layout>
                <Heading>About</Heading>

            </Layout>
        );
}


export default withApollo({ssr: true})(About)
