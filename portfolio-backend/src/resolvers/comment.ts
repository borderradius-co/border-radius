import { Resolver, Query, Args, Arg, Mutation, Authorized, UseMiddleware, Ctx, FieldResolver, Root, Field, ObjectType, Int } from "type-graphql";
import { Comment, CommentsFilter,  CommentFilter, CreateCommentInput } from '../entities/Comment';
import { Like, getRepository, getConnection } from 'typeorm';
import {Book, BookInput, BookToComment} from "../entities/Book"
// import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
// import { Upload } from '../../types/Upload';
import * as path from 'path';
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types";
import { User } from "../entities/User";
import { ProjectToComment, Project } from "../entities/Project";


@Resolver(Comment)
export class CommentResolver {
    @FieldResolver(() => User)
    user(@Root() comment: Comment,
    @Ctx() {userLoader}:MyContext
    ) {
    return userLoader.load(comment.userId)
    }


    @Query(returns => [Comment])
    async comments(
        @Args() { text, skip, take }: CommentsFilter
    ): Promise<Comment[]> {
        if (text) {
            return Comment.find({ where: { text: Like(`${text}%`), skip, take } })
        }
        return Comment.find({ skip, take });
    }

    @Query(() => Comment, {nullable:true})
    async comment(
        @Args() { id, text }: CommentFilter
    ): Promise<Comment | undefined> {
        if (id) {
            return Comment.findOne(id)
        }
        if (text) {
            return Comment.findOne(text)
        }
        throw new Error('book not found');
    };


    @Mutation(returns => Comment)
    @UseMiddleware(isAuth)
    async createComment(
        @Arg('comment') input: CreateCommentInput,
        @Arg('books', type => [BookToComment]) books: Book[],
        @Ctx() {req}:MyContext
    ): Promise<CreateCommentInput> {
      const comment = new Comment();
        comment.text = input.text;
        comment.userId =req.session.userId;
        comment.books = Promise.resolve(books);
        await comment.save();
        return comment;
    }

    @Mutation(returns => Comment)
    @UseMiddleware(isAuth)
    async createProjectComment(
        @Arg('comment') input: CreateCommentInput,
        @Arg('projects', type => [ProjectToComment]) projects: Project[],
        @Ctx() {req}:MyContext
    ): Promise<CreateCommentInput> {
      const comment = new Comment();
        comment.text = input.text;
        comment.userId =req.session.userId;
        comment.projects = Promise.resolve(projects);
        await comment.save();
        return comment;
    }

    @Mutation(returns => Comment)
    async updateComment(
        @Arg('id') id: string,
        @Arg('comment') input: CreateCommentInput
    ): Promise<CreateCommentInput> {
        const commentRepository = getRepository(Comment);
        const comment = await commentRepository.findOne(id);
        if (!comment) {
            throw new Error('comment not found');
        }
        ///////
        comment.text = input.text;
        await commentRepository.save(comment);
        return comment;
    }

    @Mutation(returns => Comment)
    @UseMiddleware(isAuth)
    async deleteComment(
        @Arg('id') id: number
    ): Promise<Comment> {
        const commentRepository = getRepository(Comment);
        const comment = await commentRepository.findOne(id);
        if (!comment) {
            throw new Error('comment not found!');
        }
        await commentRepository.delete(id);
        return comment;
    }


    // @Mutation(returns => Boolean)
    // async createAuthorImage(@Arg('file', () => GraphQLUpload) file: Upload) {
    //     const { filename, mimetype, createReadStream } = await file;
    //     const acceptedTypes = ['image/jpeg', 'image/png'];
    //     if (acceptedTypes.indexOf(mimetype) !== -1) {
    //         const stream = createReadStream();
    //         stream.pipe(createWriteStream(path.join(__dirname, `../../../images/authors/${filename}`)));
    //         return true;
    //     }
    //     throw new Error('Unsupported image type.')
    // };
}

// postman operations
// {"query":"mutation CreateAuthorImage($file: Upload!) {\n  createAuthorImage(file: $file)\n}\n"}