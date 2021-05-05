import { useColorsQuery } from "../generated/graphql";
import Values from "values.js"
import colorGenerator from "../utils/colorGenerator"


export const useGetColorValuesFromColors = () => {
    const {loading, data, fetchMore, variables} = useColorsQuery({
        variables: {
            limit: 10, 
            cursor: null
        }})
    const allColors = []

    const colors = data?.colors.colors


    let colorValueList = colors?.map((color) => {
        const newList = []
        const extractedColor = color.value
        console.log('extracted color: ', extractedColor)
        const list = new Values(extractedColor).all(10)
        let colorValue = list.map((c)=> {
            
            console.log('c:', c)
            allColors.push(c)
        })
        console.log('newList:', newList)
        return newList
    })

    

    const colorList = colorValueList

    let list = colorList?.map((color) => {
        return color
    })

    
    console.log('colorList:', colorList)

    return allColors   
}