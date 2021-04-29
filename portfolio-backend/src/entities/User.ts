import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity , OneToMany} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Project } from "./Project";
import {Updoot} from "./Updoot";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class User extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({unique: true})
  username!: string;

  @Field()
  @Column({nullable: true})
  image: string

  @Field()
  @Column({unique: true})
  email!: string;


  @Column()
  password!: string;

  @OneToMany(() => Project, project => project.creator)
  projects: Project[];


  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];


  // @OneToMany(() => Comment, comment => comment.writer)
  // comments: Comment[];


  @OneToMany(() => Updoot, (updoot) => updoot.user)
  updoots: Updoot[];
  
  // @OneToMany(() => Opinion, (opinion) => opinion.user)
  // opinions: Opinion[];  

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date ;

}