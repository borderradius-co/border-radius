// import DataLoader from "dataloader";
// import { Module } from "src/entities/ModuleOld";
// import { In } from "typeorm";
// import { Comment } from "../entities/CommentOld";
// import { CommentModule } from "../entities/CommentModule";


// const batchComments = async (moduleIds: number[]) => {
//   const commentModules = await CommentModule.find({
//     join: {
//       alias: "commentModule",
//       innerJoinAndSelect: {
//         comment: "commentModule.comment"
//       }
//     },
//     where: {
//       moduleId: In(moduleIds)
//     }
//   });

//   const moduleIdToComments: { [key: number]: Comment[] } = {};

//   /*
//   {
//     authorId: 1,
//     bookId: 1,
//     __author__: { id: 1, name: 'author1' }
//   }
//   */
//   commentModules.forEach(cm => {
//     if (cm.moduleId in moduleIdToComments) {
//         moduleIdToComments[cm.moduleId].push((cm as any).__comment__);
//     } else {
//         moduleIdToComments[cm.moduleId] = [(cm as any).__comment__];
//     }
//   });


//   return moduleIds.map(moduleId => moduleIdToComments[moduleId]);
// };

// export const createCommentsLoader= () => new DataLoader(batchComments);