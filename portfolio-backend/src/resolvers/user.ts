// import { User } from "src/entities/User"
import { MyContext } from "src/types";
import {Arg, Ctx, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root} from "type-graphql";
import argon2 from "argon2";
import {User} from "../entities/User";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import {v4} from "uuid"
import { FORGET_PASSWORD_PREFIX } from "../constants";
import { getConnection } from "typeorm";




@ObjectType()
class FieldError {
    @Field()
    field: string

    @Field()
    message: string
}



@ObjectType() 
class UserResponse {
    
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]

    @Field(() => User, {nullable:true})
    user?: User
}

@Resolver(User)
export class UserResolver {
    @FieldResolver(()=> String)
    email(@Root() user:User, @Ctx() {req}: MyContext) {

        //this is the current user and they can see their own email
        if (req.session.userId === user.id) {
            return user.email
        }

        //current user wants to see someone else's email 
        return ""
    }



    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string, 
        @Arg('newPassword') newPassword: string,
        @Ctx() {redis, req}: MyContext
    ):Promise<UserResponse> {
        if (newPassword.length <= 3) {
            return {errors: [
                {
                    field: "newPassword",
                    message: "Password is too short"
                }
            ]}   
        }
        const key = FORGET_PASSWORD_PREFIX + token
        const userId = await redis.get(key)
        if (!userId) {
            return {errors: [
                {
                    field: "token",
                    message: "Token is expired"
                }
            ]} 
        }
        const userIdNum = parseInt(userId)
        const user = await User.findOne(userIdNum);

        if (!user) {
            return {
                errors: [
                    {
                        field: 'token',
                        message: 'user no longer exists',
                    }
                ]
            }
        }

        await User.update(
            {id: userIdNum}, 
            {password: await argon2.hash(newPassword)}
            );
        
        await redis.del(key)

        //log in user after change password
        req.session.userId = user.id;

        return {user}
    }


    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() {redis}:MyContext) 
    {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return true
        }

        const token = v4();

        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
             'ex', 1000 * 60 * 60 * 24
             );//24 hours
        
        await sendEmail(
            email, 
            `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
            )
        
        
        return true;
    }


    @Query(() => User, {nullable: true})
    async me(@Ctx() {req}:MyContext) {
        console.log("session: ", req.session)

        //You are not logged in
        if (!req.session.userId) {
            return null;
        }

        return User.findOne(req.session.userId);
        

    }
    

    @Mutation(() => UserResponse)
    async register(
        @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
        @Arg('image', ()=> String) image: string,
        @Ctx() {req}:MyContext
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return {errors};
        }


        const hashedPassword = await argon2.hash(options.password);
    // const user = em.create(User, {username: options.username, password: hashedPassword});
    let user;
    try {
    //    User.create({}).save()
       const result = await getConnection().createQueryBuilder().insert().into(User).values(
            {
                username: options.username,
                email: options.email,
                password: hashedPassword,
                image: image
            }
        
        )
        .returning("*")
        .execute();
        user = result.raw[0]
    } catch(err) {
        if (err.code ==="23505" || err.detail.includes("already exists")) {
            //username already taken
            return {
                errors: [{
                    field: 'username',
                    message: 'Username is already taken'
                }]
            }
        }
        console.log("message: ", err.message)
    }
    req.session.userId = user.id;
    return {user};
    }


    @Mutation(() => UserResponse)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() {req}:MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne(usernameOrEmail.includes("@") 
        ? {where: {email: usernameOrEmail}} 
        : {where:  {username: usernameOrEmail}} 
        );

        if (!user) {
            return {
                errors: [
                    {
                        field: 'usernameOrEmail',
                        message: 'username does not exist'
                    }
                ]
            };
        }

        const valid =await argon2.verify(user.password, password);
        if(!valid) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'password is incorrect'
                    }
                ]
            };
        }

        req.session.userId = user.id
        return {user};
    }

    @Mutation(() => Boolean) 
    logout (
        @Ctx() {req, res}: MyContext
    ) {
        
        return new Promise((resolve) => req.session.destroy(err => {
            res.clearCookie("qid")
            if(err) {
                console.log(err)
                resolve(false)
                return
            }
            resolve(true)
        })) 

    }
}