import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany} from "typeorm"
import { Field, ObjectType,Int } from "type-graphql";
import { User } from "./User";
import { Updoot } from "./Updoot";

@ObjectType()
@Entity()
export class Post extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  text!: string;


  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;


  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}