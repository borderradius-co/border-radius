// import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany} from "typeorm"
// import { Field, ObjectType,Int } from "type-graphql";
// import { Opinion } from "./Opinion";
// @ObjectType()
// @Entity()
// export class Article extends BaseEntity {

//   @Field()
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @OneToMany(() => Opinion, (opinion) => opinion.article)
//   opinions: Opinion[];


//   @Field()
//   @Column()
//   name!: string;


//   @Field(() => String)
//   @CreateDateColumn()
//   createdAt: Date;


//   @Field(() => String)
//   @UpdateDateColumn()
//   updatedAt: Date;

// }