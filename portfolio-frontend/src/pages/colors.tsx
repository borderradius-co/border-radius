import React from 'react'
import ColorGenerator from '../components/ColorGenerator';
import { withApollo } from '../utils/withApollo';

interface colorsProps {

}

const Colors: React.FC<colorsProps> = ({}) => {
        return (
        <ColorGenerator></ColorGenerator>);
}

export default withApollo({ssr: false})(Colors);