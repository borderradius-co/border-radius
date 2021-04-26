import { Resolver, Query, Args, Arg, Mutation, Authorized, UseMiddleware, ObjectType, Field, Int } from "type-graphql";
import { Book, BookFilter, BooksFilter, CreateBookInput } from '../entities/Book';
import { Like, getRepository, getConnection } from 'typeorm';

// import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
// import { Upload } from '../../types/Upload';
import * as path from 'path';
import { Comment, CommentInput } from '../entities/Comment';
import { isAuth } from "../middleware/isAuth";

@ObjectType()
class PaginatedBooks {
    @Field(() => [Book])
    books: Book[];

    @Field()
    hasMore: boolean;
}

@Resolver(Book)
export class BookResolver {

      
    @Query(returns => [Book])
    async allBooks(
        @Args() { title, skip, take }: BooksFilter
    ): Promise<Book[]> {
        if (title) {
            return Book.find({ where: { title: Like(`${title}%`) }, skip, take });
        }
        return Book.find({ skip, take });
    }


    @Query(() => PaginatedBooks)
    async books(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, {nullable: true}) cursor: string | null
    ):Promise<PaginatedBooks> {
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const replacements: any[] = [realLimitPlusOne];

        if (cursor) {
            replacements.push(new Date(parseInt(cursor)))
        }

        const books = await getConnection().query(`
        select b.*
        from book b
        ${cursor ? `where b."createdAt" < $2` : ""}
        order by b."createdAt" DESC
        limit $1
        `, replacements)
        return {
            books: books.slice(0, realLimit), 
            hasMore: books.length === realLimitPlusOne,
        };
    }

    @Query(() => Book, {nullable: true})
    async book(
        @Args() { id, title }: BookFilter
    ): Promise<Book | undefined>{
        if (id) {
            return Book.findOne(id)
        }
        if (title) {
            return Book.findOne(title)
        }
        throw new Error('book not found');
    };

    @Mutation(returns => Book)
    async createBook(
        @Arg('book') input: CreateBookInput,
    ): Promise<CreateBookInput> {
        const book = new Book();
        book.title = input.title;
        await book.save();
        return book;
    }

    @Mutation(returns => Book)
    async updateBook(
        @Arg('id') id: string,
        @Arg('book') input: CreateBookInput
    ): Promise<CreateBookInput> {
        const bookRepository = getRepository(Book);
        const book = await bookRepository.findOne(id);
        if (!book) {
            throw new Error('book not found');
        }
        book.title = input.title;
        // book.slug = input.slug;
        // book.image = input.image;
        // book.description = input.description;
        // book.firstEditionYear = input.firstEditionYear;
        // book.edition = input.edition;
        // book.numberOfPage = input.numberOfPage;
        // book.isbn = input.isbn;
        // book.language = input.language;
        await bookRepository.save(book);
        return book;
    }

    @Mutation(returns => Book)
    @UseMiddleware(isAuth)
    async deleteBook(
        @Arg('id') id: string
    ): Promise<Book> {
        const bookRepository = getRepository(Book);
        const book = await bookRepository.findOne(id);
        if (!book) {
            throw new Error('book not found!')
        }
        await bookRepository.delete(id);
        return book;
    }

}

// postman operations
// {"query":"mutation CreateBookImage($file: Upload!) {\n  createBookImage(file: $file)\n}\n"}