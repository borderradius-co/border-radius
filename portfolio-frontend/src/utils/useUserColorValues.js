import {colorGenerator} from "../utils/colorGenerator"
import { useColorsQuery } from "../generated/graphql";




export const useUserColorValues = () => {
    const { data  } = useColorsQuery({});
    const color = data.colors.colors.map((color) => {
        return color.value
    })
    const userColors = colorGenerator(color)
    console.log('userColors: ', userColors)
    return userColors
}



// const getUser = data.colors.colors.map((color) => {
//     return color
// })