import {COOKIE_NAME, __prod__} from "./constants";
import 'reflect-metadata'
// import 'dotenv-safe/config'; 
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import { ProjectResolver } from "./resolvers/project";
import { UserResolver } from "./resolvers/user";
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from "connect-redis";
import cors from "cors"
import {createConnection} from "typeorm"
import { Project } from "./entities/Project";
import { User } from "./entities/User";
import path from "path";
import { Updoot } from "./entities/Updoot";
import { createUserLoader } from "./utils/CreateUserLoader";
import { createUpdootLoader } from "./utils/CreateUpdootLoader";
import { Book } from "./entities/Book";
import {  CommentResolver } from "./resolvers/comment";
import { BookResolver } from "./resolvers/book";
import { createBookLoader } from "./utils/CreateBookLoader";
import {Comment} from "./entities/Comment";




const main = async () => {

    const conn = await createConnection({
        type: 'postgres',
        logging: true, 
        url: process.env.DATABASE_URL,
        // synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*") ],
        entities: [Project, User, Updoot, Book, Comment]

    });
    
    await conn.runMigrations()
    //rerun
    // await Book.delete({})
    // await Book.delete({})
    // await Updoot.delete({})
    // await User.delete({})
    // await Module.delete({})
    // await Project.delete({})
    //rerun

    const app = express();
  

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.DATABASE_URL);

    app.set('proxy', 1)
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true
        })
    ) 
    app.use(
     session({
        name: COOKIE_NAME,
        store: new RedisStore({ client: redis,
        disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
            httpOnly: true,
            sameSite: "lax", //csrf
            secure: __prod__, //cookie only works in https
            domain: __prod__ ? ".border-radius.me" : undefined,
        },
        saveUninitialized: false,
        //secret should be in an environment variable file
        secret: "ifiafuadjfkrheqkjwrhrjeqwljrlqe",
        resave: false,
     })
    );

    const apolloserver = new ApolloServer({
        schema: await buildSchema({
            resolvers :[HelloResolver, ProjectResolver, UserResolver, CommentResolver, BookResolver],
            validate: false
        }),
        context: ({req, res}) => ({ req, res, redis, userLoader: createUserLoader(), updootLoader: createUpdootLoader(), createBookLoader: createBookLoader()})
    });

    apolloserver.applyMiddleware({app, cors: false});


    app.listen(4000 , () => {
        console.log("server started on localhost:4000")
    })
}

main().catch((err) => {
    console.error(err);
})

