import Values from "values.js";

export const colorGenerator = (color) => {
    const list = new Values(color).all(10)
    list.pop()
    list.shift()
    list.pop()
    console.log('ColorLis: ', list)

    return list
}



