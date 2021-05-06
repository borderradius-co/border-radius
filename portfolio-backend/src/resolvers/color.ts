import { User } from "../entities/User";
import {Color} from "../entities/Color"
import { MyContext } from "../types"
import { isAuth } from "../middleware/isAuth"
import {Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware} from "type-graphql"
import { getConnection } from "typeorm";
import { ColorInput } from "./ColorInput";
import { validateColor } from "../utils/validateColor";


@ObjectType()
class ColorFieldError {
    @Field()
    field: string

    @Field()
    message: string
}

@ObjectType()
class PaginatedColors {
    @Field(() => [Color])
    colors: Color[]

    @Field()
    hasMore: boolean
}

@ObjectType()
class UserColorResponse {
    @Field(() => [ColorFieldError], {nullable:true})
    errors?:ColorFieldError[]

    @Field(() => Color, {nullable:true})
    color?:Color
}


@Resolver(Color)
export class ColorResolver {

    @FieldResolver(() => User)
    user(@Root() color: Color,
    @Ctx() {userLoader}:MyContext
    ) {
    return userLoader.load(color.userId)
    }



    @Query(() => PaginatedColors)
    async colors(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, {nullable:true}) cursor: string | null
    ): Promise<PaginatedColors> {
        const realLimit = Math.min(50, limit)
        const realLimitPlusOne = realLimit + 1

        const replacements: any[] = [realLimitPlusOne]

         if (cursor) {
            replacements.push(new Date(parseInt(cursor)))
        }

        const colors = await getConnection().query(`
            select c.*
            from color c
            ${cursor ? `where c."createdAt" < $2` : ""}
            order by c."createdAt" DESC
            limit $1
        `,
        replacements)
        return {
            colors: colors.slice(0, realLimit), 
            hasMore: colors.length === realLimitPlusOne,
        };
    }

    @Mutation(() => UserColorResponse)
    @UseMiddleware(isAuth)
    async createColor(
        @Arg('value', ()=> String) value:string,
        @Ctx() {req}:MyContext
    ):Promise<UserColorResponse> {
            const errors = validateColor(value)
            if (errors) {
                return {errors}
            }

            let color;

            try {
                const result = await getConnection().createQueryBuilder().insert().into(Color).values(
            {
                value: value,
                userId: req.session.userId,
                
            }
            
            )
            .returning("*")
            .execute()
            color = result.raw[0]
            console.log('color: ',color)

            } catch(err) {
                console.log(err)
            }
            
            return {color}
        
    }


    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteColor(
        @Arg('id', () => Int) id: number, 
        @Ctx() {req}:MyContext
        ):Promise<boolean> {
            await Color.delete({id, userId: req.session.userId})
            return true;
    }
}