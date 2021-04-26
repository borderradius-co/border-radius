// import { Field, ObjectType,ID } from "type-graphql";
// import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { CommentModule } from "./CommentModule";
// import {User} from "./User"
// @ObjectType()
// @Entity()
// export class Comment extends BaseEntity {
//     @Field(() => ID)
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Field()
//     @Column()
//     writerId: number;

//     @ManyToOne(() => User, user => user.comments)
//     writer: User

//     @Field()
//     @Column()
//     text: string;

//     @OneToMany(() => CommentModule, cm => cm.comment)
//     moduleConnection: Promise<CommentModule[]>;
    
//     @Field(() => String)
//     @CreateDateColumn()
//     createdAt: Date;
  
  
//     @Field(() => String)
//     @UpdateDateColumn()
//     updatedAt: Date;

// }