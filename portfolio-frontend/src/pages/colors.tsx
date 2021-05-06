import React from 'react'
import { withApollo } from '../utils/withApollo';
import ColorValueList from '../components/ColorValueList'
import {Heading} from "@chakra-ui/react"

import ColorGenetatorToolBar from '../components/ColorGenetatorToolBar';
import { Layout } from '../components/Layout';
interface colorsProps {

}

const Colors: React.FC<colorsProps> = ({}) => {

    
        return (
        <Layout>
                <Heading>Colors</Heading>
                 <ColorGenetatorToolBar/>
                 <ColorValueList/>
        </Layout>
       
         
              
        )      
}

export default withApollo({ssr: true})(Colors);