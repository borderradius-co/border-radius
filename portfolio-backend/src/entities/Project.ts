import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, JoinTable, ManyToMany} from "typeorm"
import { Field,InputType, ObjectType,Int } from "type-graphql";
import { User } from "./User";
import { Updoot } from "./Updoot";
import {Comment} from "./Comment";
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

  @ManyToMany(type => Comment, comment => comment.projects, { lazy: true })
    @JoinTable({
        name: "project_comment", // table name for the junction table of this relation
        joinColumn: {
            name: "projectId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "commentId",
            referencedColumnName: "id"
        }
    })

    @Field(type => [Comment])
    comments: Promise<Comment[]>;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;


  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}

@InputType()
export class ProjectToComment {
  @Field()
  id: number
}
