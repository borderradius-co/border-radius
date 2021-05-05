import Values from "values.js";

export const colorGenerator = (color) => {
    const list = new Values(color).all(10)
    return list
}



