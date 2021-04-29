import { Request, Response } from "express";
import { Redis } from "ioredis";
import session from "express-session";
import { createUserLoader } from "./utils/CreateUserLoader";
import { createUpdootLoader } from "./utils/CreateUpdootLoader";
// import { createAuthorsLoader } from "./utils/CreateAuthorsLoader";
// import { createCommentsLoader } from "./utils/CreateCommentsLoader";
import { createBookLoader } from "./utils/CreateBookLoader";
// import { createOpinionLoader } from "./utils/CreateOpinionLoader";
import { Storage } from 'aws-amplify';


declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export type MyContext = {
  req: Request & { session: session.SessionData };
  res: Response;
  redis: Redis;
  storage: Storage;
  userLoader: ReturnType<typeof createUserLoader>; 
  updootLoader: ReturnType<typeof createUpdootLoader>
  bookLoader: ReturnType<typeof createBookLoader>;
  // commentsLoader: ReturnType<typeof createCommentsLoader>;
  // opinionLoader: ReturnType<typeof createOpinionLoader>;
};

