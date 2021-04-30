// import {Article} from "../entities/Article"
// import {Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware} from "type-graphql"
// import { MyContext } from "../types"
// import { isAuth } from "../middleware/isAuth"
// import { getConnection } from "typeorm";
// import { Opinion } from "../entities/Opinion";
// import { User } from "../entities/User";

// @InputType()
// class OpinionInput {
//     @Field()
//     text: string;
// }


// @Resolver(Opinion)
// export class OpinionResolver {
//     @Mutation(() => Opinion)
//     @UseMiddleware(isAuth)
//     async createComment(
//         @Arg('text', () => String) text: string,
//         @Arg('articleId', () => Int) articleId: number,
//         @Ctx() {req}:MyContext
//     )  {
//         const {userId} = req.session;
         
//         const addOpinion = await getConnection().transaction(async (tm) => {
//             await tm.query(
//                 `
//                 insert into opinion ("userId", "articleId", "text") 
//                 values ($1, $2, $3)       
//                 `,
//                 [userId, articleId, text]
//             )
//             return addOpinion
//         })
       
//     }
// }