import { Request, Response } from "express";
import { Redis } from "ioredis";
import session from "express-session";
import { createUserLoader } from "./utils/CreateUserLoader";
import { createUpdootLoader } from "./utils/CreateUpdootLoader";

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

export type MyContext = {
  req: Request & { session: session.SessionData };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>; 
  updootLoader: ReturnType<typeof createUpdootLoader>
};

// export type MyContext={
//     req: Request & { session: Express.Session };
//     redis: Redis;
//     res: Response;
// }

