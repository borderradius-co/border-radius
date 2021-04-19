import {Project} from "../entities/Project"
import {Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware} from "type-graphql"
import { MyContext } from "../types"
import { isAuth } from "../middleware/isAuth"
import { getConnection } from "typeorm";
import { Updoot } from "../entities/Updoot";

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

    @Mutation(() => Boolean )
    @UseMiddleware(isAuth)
    async vote(
        @Arg('projectId', () => Int) projectId: number,
        @Arg('value', () => Int) value: number,
        @Ctx() {req}: MyContext
    ) {
       
        const isUpdoot = value !== -1;
        const realValue = isUpdoot ? 1 : -1;
        const {userId} = req.session;
        const updoot = await Updoot.findOne({where: {projectId, userId}})

        //three states 
        //1)user has voted on the project before 
        // && they are changing their vote
        if (updoot && updoot.value !== realValue) {
            await getConnection().transaction(async (tm) => {
              await tm.query(
                `
                update updoot
                set value = $1
                where "projectId" = $2 and "userId" = $3
              `,
                [realValue, projectId, userId]
              );
      
              await tm.query(
                `
                update project
                set points = points + $1
                where id = $2
              `,
                [2 * realValue, projectId]
              );
            });
          } else if (!updoot) {
            // has never voted before
            await getConnection().transaction(async (tm) => {
              await tm.query(
                `
                insert into updoot ("userId", "projectId", value)
                values ($1, $2, $3)
              `,
                [userId, projectId, realValue]
              );
      
              await tm.query(
                `
                update project
                set points = points + $1
                where id = $2
            `,
                [realValue, projectId]
              );
            });
          }
          return true;
    }

    @Query(() => PaginatedProjects)
    async projects(
        @Arg('limit', () => Int) limit: number, 
        @Arg('cursor', () => String, {nullable: true}) cursor: string | null,
        @Ctx() {req}: MyContext
    ):Promise<PaginatedProjects> {
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const replacements: any[] = [realLimitPlusOne];

        if (req.session.userId) {
            replacements.push(req.session.userId)
        }
        let cursorIndex = 3

        if (cursor) {
            replacements.push(new Date(parseInt(cursor)))
            cursorIndex = replacements.length
        }

        const projects = await getConnection().query(`
            select p.*, 
            json_build_object(
                'id', u.id,
                'username', u.username,
                'email', u.email,
                'createdAt', u."createdAt", 
                'updatedAt', u."updatedAt"
                ) creator,
                ${req.session.userId 
                ? '(select value from updoot where "userId" = $2 and "projectId" = p.id) "voteStatus"' 
                : 'null as "voteStatus" '}
                

            from project p
            inner join public.user u on u.id = p."creatorId"
            ${cursor ? `where p."createdAt" < $${cursorIndex} ` : ""}
            order by p."createdAt" DESC
            limit $1
        `,
        replacements)

        // const qb = getConnection()
        // .getRepository(Project)
        // .createQueryBuilder("p")
        // .innerJoinAndSelect(
        //     "p.creator", "u", 'u.id = p."creatorId"'
        // )
        // .orderBy('p."createdAt"', "DESC")
        // .take(realLimitPlusOne)

        // if (cursor) {
        //     qb.where('p."createdAt" <  :cursor', {
        //         cursor: new Date(parseInt(cursor))
        //     });
        // }
        // const projects = await qb.getMany()
        return {
            projects: projects.slice(0, realLimit), 
            hasMore: projects.length === realLimitPlusOne,
        };
    }

    @Query(() => Project, {nullable: true})
    project(@Arg('id', () => Int ) id: number): Promise<Project | undefined> {
        return Project.findOne(id, {relations: ["creator"]})
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
    @UseMiddleware(isAuth)
    async deleteProject(
        @Arg('id', () => Int) id: number, 
        @Ctx() {req}:MyContext
        ):Promise<boolean> {
            const project = await Project.findOne(id)
            if (!project) {
                return false
            }
            if (project.creatorId !== req.session.userId) {
                throw new Error('not authorized')
            }
            await Updoot.delete({projectId: id})
            await Project.delete({id})

            return true;
    }
}