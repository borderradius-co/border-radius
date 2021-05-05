import { colorGenerator } from "../utils/colorGenerator";
import { useColorsQuery } from "../generated/graphql";

export const useGetUserColors = () => {
  const { data } = useColorsQuery({});
  const color = data?.colors.colors.map((color) => {
    let list = []
    list.push(color.value)
    return list;
  });

  return color
};
