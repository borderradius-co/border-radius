import {COOKIE_NAME, __prod__} from "./constants";
import 'reflect-metadata'
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

const main = async () => {

    const conn = await createConnection({
        type: 'postgres',
        database: 'border',
        username: 'postgres',
        password: 'postgres',
        logging: true, 
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*") ],
        entities: [Project, User, Updoot],
    });

    await conn.runMigrations()
    //rerun
    // await Project.delete({})
    //rerun

    const app = express();
  

    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(
        cors({
            origin:"http://localhost:3000",
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
            secure: __prod__ //cookie only works in https
        },
        saveUninitialized: false,
        //secret should be in an environment variable file
        secret: 'ifiafuadjfkrheqkjwrhrjeqwljrlqe',
        resave: false,
     })
    );

    const apolloserver = new ApolloServer({
        schema: await buildSchema({
            resolvers :[HelloResolver, ProjectResolver, UserResolver],
            validate: false
        }),
        context: ({req, res}) => ({ req, res, redis, userLoader: createUserLoader(), updootLoader: createUpdootLoader(),})
    });

    apolloserver.applyMiddleware({app, cors: false});


    app.listen(4000, () => {
        console.log("server started on localhost:4000")
    })
}

main().catch((err) => {
    console.error(err);
})

