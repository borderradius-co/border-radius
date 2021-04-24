import { useRouter } from "next/router";
import { useModuleQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetModuleFromUrl = () => {
    const intId = useGetIntId()
    return useModuleQuery({
        pause: intId === -1,
        variables: {
            id: intId
        }
    })
}