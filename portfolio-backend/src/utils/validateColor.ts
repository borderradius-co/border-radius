import { ColorInput } from "../resolvers/ColorInput";

export const validateColor = (options: ColorInput) => {
    function isValidColor(str: string) {
    return str.match(/^#[a-f0-9]{6}$|^#[a-f0-9]{3}$/i) !== null;
    }

    if (!isValidColor(options.value)) {
        console.log(options.value)
        return [{
            field: "value",
            message: "This is a not a valid hex color" 
        }]
    }

    return null
    
}