import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity , OneToMany} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Project } from "./Project";

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
  @Column({unique: true})
  email!: string;


  @Column()
  password!: string;

  @OneToMany(() => Project, project => project.creater)
  projects: Project[];

  // @OneToMany(() => Article, article => article.creater)
  // articles: Article[];


  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date ;

}