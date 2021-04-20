import DataLoader from "dataloader";
import { Updoot } from "../entities/Updoot";
import {User} from "../entities/User";

//[{projectId: 5, userId: 10}]
//return {projectId: 5, userId: 10, value: 1}

export const createUpdootLoader = () => 
new DataLoader< {projectId: number; userId: number}, Updoot | null >
( async (keys) => {
    const updoots = await Updoot.findByIds(keys as any);
    const updootIdsToUpdoot: Record<string, Updoot> = {};
    updoots.forEach(updoot => {
        updootIdsToUpdoot[ `${updoot.userId}|${updoot.projectId}`] = updoot
    });

    console.log("updoots: ", updoots)
    return keys.map(
        (key) => updootIdsToUpdoot[`${key.userId}|${key.projectId}`]
    )

});