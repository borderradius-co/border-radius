import {Project} from "../entities/Project"
import {Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware} from "type-graphql"
import { MyContext } from "../types"
import { isAuth } from "../middleware/isAuth"
import { getConnection } from "typeorm";

@InputType()
class ProjectInput {
    @Field()
    name: string;

    @Field()
    text: string;
}

@ObjectType()
class PaginatedProjects {
    @Field(() => [Project])
    projects: Project[]

    @Field()
    hasMore: boolean;
}

@Resolver(Project)
export class ProjectResolver {
    @FieldResolver(() => String)
    textSnippet(@Root() root: Project) {
        return root.text.slice(0, 50)
    }

    @Query(() => PaginatedProjects)
    async projects(
        @Arg('limit', () => Int) limit: number, 
        @Arg('cursor', () => String, {nullable: true}) cursor: string | null
    ):Promise<PaginatedProjects> {
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;
        const qb = getConnection()
        .getRepository(Project)
        .createQueryBuilder("p")
        .orderBy('"createdAt"', "DESC")
        .take(realLimitPlusOne)

        if (cursor) {
            qb.where('"createdAt" <  :cursor', {
                cursor: new Date(parseInt(cursor))
            });
        }
        const projects = await qb.getMany()
        return {
            projects: projects.slice(0, realLimit), 
            hasMore: projects.length === realLimitPlusOne,
        };
    }

    @Query(() => Project, {nullable: true})
    project(@Arg('id', () => Int ) id: number): Promise<Project | undefined> {
        return Project.findOne(id)
    }

    @Mutation(() => Project)
    @UseMiddleware(isAuth)
    async createProject(
      @Arg("input") input: ProjectInput,
      @Ctx() { req }: MyContext
    ): Promise<Project> {
      return Project.create({
        ...input,
        creatorId: req.session.userId,
      }).save();
    }

    @Mutation(() => Project, {nullable: true})
    async updateProject(
        @Arg('id') id: number,
        @Arg ('name',  () => String, {nullable: true}) name: string
        ):Promise<Project | null> {
        const project =  await Project.findOne(id);

        if (!project) {
            return null
        }
        if (typeof name !== "undefined") {
            await Project.update({id}, {name});
        }
        return project;
    }

    @Mutation(() => Boolean)
    async deleteProject(
        @Arg('id') id: number):Promise<boolean> {
       await Project.delete(id)

        return true;
    }
}