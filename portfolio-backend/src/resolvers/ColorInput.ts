import { Field, InputType } from "type-graphql";

@InputType()
export class ColorInput {
    @Field()
    value: string;
}