// import DataLoader from "dataloader";
// import { Article } from "src/entities/Article";
// import { Opinion } from "../entities/Opinion";

// //[{projectId: 5, userId: 10}]
// //return {projectId: 5, userId: 10, value: 1}

// export const createOpinionLoader = () => 
// new DataLoader< {articleId: number; userId: number}, Opinion | null >
// ( async (keys) => {
//     const opinions = await Opinion.findByIds(keys as any);
//     const opinionIdsToOpinion: Record<string, Opinion> = {};
//     opinions.forEach(opinion => {
//         opinionIdsToOpinion[ `${opinion.articleId}|${opinion.userId}`] = opinion
//     });

//     console.log("updoots: ", opinions)
//     return keys.map(
//         (key) => opinionIdsToOpinion[`${key.articleId}|${key.userId}`]
//     )

// });