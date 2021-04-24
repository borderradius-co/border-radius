import { useRouter } from "next/router";
import { useBookQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetBookFromUrl = () => {
    const intId = useGetIntId()
    return useBookQuery({
        pause: intId === -1,
        variables: {
            id: intId
        }
    })
}