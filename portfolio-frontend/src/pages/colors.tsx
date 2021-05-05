import React, {useState} from 'react'
import ColorGenerator from '../components/ColorGenerator';
import { withApollo } from '../utils/withApollo';
import ColorGeneratorAll from '../components/ColorGeneratorAll'
import {useColorsQuery} from "../generated/graphql"
import {Box, Flex, SimpleGrid, Text} from "@chakra-ui/react"
import Values from "values.js"
import SingleColor from '../components/SingleColor';
import {useGetColorValuesFromColors} from "../utils/useGetColorValuesFromColors"
import {colorGenerator} from "../utils/colorGenerator"
import {useUserColorValues} from "../utils/useUserColorValues"
import {useGetUserColors} from "../utils/useGetUserColors"
interface colorsProps {

}

const Colors: React.FC<colorsProps> = ({}) => {
        const [color, setColor] = useState('#8D036F')
        const [list, setList] = useState(new Values('#8D036F').all(10))   
        const {loading, data, fetchMore, variables} = useColorsQuery({
        variables: {
            limit: 10, 
            cursor: null
        },
        notifyOnNetworkStatusChange: true
        });


        console.log('color generator: ', colorGenerator('#8D036F'))
        const colorValues = useGetColorValuesFromColors()
        const userColorValues = useGetUserColors()
        const mappedColor = colorValues?.map((color)=> {
                console.log('inside mappedcolor:', color)
                
                return color
        })
        console.log("userColorValues: ",userColorValues)


        if (!loading && !data) {
        return <div>There are nothing to display! Error!</div>
        }

        return (
        <>
        {data?.colors.colors.map((color) => {
                return <div>{color.user.username}</div>
                
        })}
         <ColorGeneratorAll/>
        </>       
        )      
}

export default withApollo({ssr: true})(Colors);