import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, JoinTable, ManyToMany} from "typeorm"
import { Field, ObjectType,Int, InputType } from "type-graphql";
import { User } from "./User";


@ObjectType()
@Entity()
export class Color extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Field()
  @Column()
  userId: number;

  @Field(type => User)
  @ManyToOne(type => User, user => user.colors)
  user: User;

  @Field()
  @Column()
  value!: string;


  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;


  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

 

}
