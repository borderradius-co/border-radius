import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { ObjectType, Field, ID, Int, ArgsType, InputType } from 'type-graphql';
import { Comment } from './Comment';

@Entity()
@ObjectType()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    title: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
  
  
    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    // book_comments
    @ManyToMany(type => Comment, comment => comment.books, { lazy: true })
    @JoinTable({
        name: "book_comment", // table name for the junction table of this relation
        joinColumn: {
            name: "bookId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "commentId",
            referencedColumnName: "id"
        }
    })
    @Field(type => [Comment])
    comments: Promise<Comment[]>;
}

@InputType()
export class BookInput {
  @Field()
  id: number

  @Field()
  title: string
}

@InputType()
export class BookToComment {
  @Field()
  id: number
}


@InputType()
export class CreateBookInput {

    @Field()
    title: string;
}


@ArgsType()
export class BooksFilter {
    @Field({ nullable: true })
    title?: string;

    @Field(type => Int, { nullable: true })
    skip?: number;

    @Field(type => Int, { nullable: true })
    take?: number;
}

@ArgsType()
export class BookFilter {
    @Field({ nullable: true })
    id?: number;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    slug?: string;
}