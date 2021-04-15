// import {Article} from "../entities/Article";
// import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";

// @Resolver()
// export class ArticleResolver {

//     @Query(() => [Article])
//     async articles():Promise<Article[]> {
//         return Article.find()
//     }

//     @Query(() => Article, {nullable: true})
//     article(@Arg('id', () => Int ) id: number): Promise<Article | undefined> {
//         return Article.findOne(id)
//     }

//     @Mutation(() => Article)
//     async createArticle(
//         @Arg('title') title: string):Promise<Article> {
        
//         return Article.create({title}).save();
//     }



//     @Mutation(() => Article, {nullable: true})
//     async updateArticle(
//         @Arg('id') id: number,
//         @Arg ('name',  () => String, {nullable: true}) title: string
//         ):Promise<Article | null> {
//         const article =  await Article.findOne(id);

//         if (!article) {
//             return null
//         }
//         if (typeof title !== "undefined") {
//             await Article.update({id}, {title});
//         }
//         return article;
//     }

//     @Mutation(() => Boolean)
//     async deleteArticle(
//         @Arg('id') id: number):Promise<boolean> {
//        await Article.delete(id)

//         return true;
//     }
// }