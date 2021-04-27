import { Entity,CreateDateColumn,PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, InputType, ArgsType, Int } from 'type-graphql';
import { Book } from './Book';
import { User } from './User';
import { Project } from './Project';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    text: string

    @Field()
    @Column()
    userId: number;

    @Field(type => User)
    @ManyToOne(() => User, user => user.comments)
    user: User;

     // book_comments
     @ManyToMany(type => Book, book => book.comments, { lazy: true })
     @Field(type => [Book])
     books: Promise<Book[]>

     @ManyToMany(type => Project, project => project.comments, { lazy: true })
     @Field(type => [Project])
     projects: Promise<Project[]>

     @Field(() => String)
     @CreateDateColumn()
     createdAt: Date;
}

@InputType()
export class CommentInput {

    @Field()
    id: number;


    @Field()
    text: string
}

@InputType()
export class CreateCommentInput {

    @Field()
    text: string

}

@ArgsType()
export class CommentsFilter {
    @Field({ nullable: true })
    text?: string;

    @Field(type => Int, { nullable: true })
    skip?: number;

    @Field(type => Int, { nullable: true })
    take?: number;
}

@ArgsType()
export class CommentFilter {
    @Field({ nullable: true })
    id?: number;

    @Field({ nullable: true })
    text?: string;

}