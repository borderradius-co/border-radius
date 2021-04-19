import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany} from "typeorm"
import { Field, ObjectType,Int } from "type-graphql";
import { User } from "./User";
import { Updoot } from "./Updoot";

@ObjectType()
@Entity()
export class Project extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int, {nullable: true} )
  voteStatus: number | null; //-1, 1 or null


  @Field()
  @Column()
  creatorId: number;

  @Field()
  @ManyToOne(() => User, user => user.projects)
  creator: User;

  @OneToMany(() => Updoot, (updoot) => updoot.project)
  updoots: Updoot[];


  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({type:"int", default: 0})
  points!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;


  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}
