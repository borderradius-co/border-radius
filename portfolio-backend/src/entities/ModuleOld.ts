// import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany} from "typeorm"
// import { Field, ObjectType,Int, Ctx, ID } from "type-graphql";
// import { CommentModule } from "./CommentModule";
// import { MyContext } from "src/types";
// import {Comment} from "./CommentOld"

// @ObjectType()
// @Entity()
// export class Module extends BaseEntity {
//   @Field(() => ID)
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Field()
//   @Column()
//   name: string;

//   // @Field()
//   // @Column()
//   // text: string;

//   @OneToMany(() => CommentModule, cm => cm.module)
//   commentConnection: Promise<CommentModule[]>;



//   @Field(()=> [Comment], {nullable:true}) 
//   async comments(@Ctx() {commentsLoader} : MyContext) : Promise<Comment[]> {
//       return commentsLoader.load(this.id)
//   }

//   @Field(() => String)
//   @CreateDateColumn()
//   createdAt: Date;


//   @Field(() => String)
//   @UpdateDateColumn()
//   updatedAt: Date;

// }
