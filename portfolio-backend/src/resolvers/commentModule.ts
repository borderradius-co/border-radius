// import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
// import {Module} from "../entities/ModuleOld";
// import {Comment} from "../entities/CommentOld";
// import { CommentModule } from "../entities/CommentModule";
// import { getConnection } from "typeorm";
// import { User } from "../entities/User";
// import { MyContext } from "../types";
// import { isAuth } from "../middleware/isAuth";
// @InputType()
// class CommentInput {
//     @Field()
//     text: string;
// }

// @ObjectType()
// class PaginatedModules {
//     @Field(() => [Module])
//     modules: Module[]

//     @Field()
//     hasMore: boolean;

// }

// @ObjectType()
// class PaginatedComments {
//     @Field(()=> [Comment])
//     comments: Comment[]

//     @Field()
//     hasMore: boolean;
// }



// @Resolver(Comment)
// export class CommentModuleResolver {
//     @FieldResolver(() => User)
//     creator(@Root() comment: Comment,
//     @Ctx() {userLoader}:MyContext
//     ) {
//     return userLoader.load(comment.writerId)
//     }
    
//   @Mutation(() => Module)
//   async createModule(@Arg("name") name: string) {
//     return Module.create({name}).save()  
//   }

//   @Mutation(() => Comment)
//   @UseMiddleware(isAuth)
//   async createComment(
//     @Arg("input") input: CommentInput,
//     @Ctx() {req}: MyContext
//     ): Promise<Comment> {
//     return Comment.create({ 
//         ...input ,
//         writerId: req.session.userId,   
//         }).save();
//   }

//   @Mutation(() => Boolean)
//   async addCommentModule(
//     @Arg("commentId", () => Int) commentId: number,
//     @Arg("moduleId", () => Int) moduleId: number
//   ) {
//     await CommentModule.create({ commentId, moduleId }).save();
//     return true;
//   }

//   @Mutation(() => Boolean)
//   async deleteModule(@Arg("moduleId", () => Int) moduleId: number) {
//     await CommentModule.delete({ moduleId });
//     await Module.delete({ id: moduleId });
//     return true;
//   }

//   @Query(() => [Module])
//   async modules() {
//     return Module.find();
//   }

//   @Query(() => Module, {nullable: true})
//   module(@Arg('id', () => Int) id: number): Promise<Module | undefined> {
//       return Module.findOne(id)
//   }


//   @Query(() => PaginatedModules)
//   async paginatedModules(
//     @Arg('limit', () => Int) limit: number, 
//     @Arg('cursor', () => String, {nullable: true}) cursor: string | null,
//   ):Promise<PaginatedModules> {
//     const realLimit = Math.min(50, limit);
//     const realLimitPlusOne = realLimit + 1;

//     const replacements: any[] = [realLimitPlusOne];

//     if (cursor) {
//         replacements.push(new Date(parseInt(cursor)))
//     }

//     const paginatedModules = await getConnection().query(`
//         select m.*
//         from module m
//         ${cursor ? 'where m"createdAt" < $2' : ""}
//         order by m."createdAt" DESC
//         limit $1
//     `, replacements)

//     return {
//         modules: paginatedModules.slice(0, realLimit),
//         hasMore: paginatedModules.length === realLimitPlusOne
//     }
//   }


//   @Query(() => PaginatedComments)
//   async paginatedComments(
//     @Arg('limit', () => Int) limit: number, 
//     @Arg('cursor', () => String, {nullable: true}) cursor: string | null,
//   ):Promise<PaginatedComments> {
//     const realLimit = Math.min(50, limit);
//     const realLimitPlusOne = realLimit + 1;

//     const replacements: any[] = [realLimitPlusOne];

//     if (cursor) {
//         replacements.push(new Date(parseInt(cursor)))
//     }

//     const paginatedComments = await getConnection().query(`
//         select c.*
//         from comment c
//         ${cursor ? 'where c"createdAt" < $2' : ""}
//         order by c."createdAt" DESC
//         limit $1
//     `, replacements)

//     return {
//         comments: paginatedComments.slice(0, realLimit),
//         hasMore: paginatedComments.length === realLimitPlusOne,
//     }
//   }
// }