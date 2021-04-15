import { Field, InputType } from "type-graphql";

// import  {COOKIE_NAME } from "src/constants";
@InputType()
export class UsernamePasswordInput {
    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    email: string;
}
