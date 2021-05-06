import { ColorInput } from "../resolvers/ColorInput";

export const validateColor = (value: string) => {
    function isValidColor(str: string) {
    return str.match(/^#[a-f0-9]{6}$|^#[a-f0-9]{3}$/i) !== null;
    }

    if (!isValidColor(value)) {
        console.log(value)
        return [{
            field: "value",
            message: "This is a not a valid hex color" 
        }]
    }

    return null
    
}