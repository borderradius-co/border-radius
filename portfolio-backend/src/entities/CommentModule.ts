// import { Field } from "type-graphql";
// import {
//     BaseEntity,
//     Column,
//     Entity,
//     JoinColumn,
//     ManyToOne,
//     PrimaryColumn
//   } from "typeorm";
//   import { Comment } from "./CommentOld";
//   import { Module } from "./ModuleOld";
  
//   @Entity()
//   export class CommentModule extends BaseEntity {
//     @PrimaryColumn()
//     commentId: number;
  
//     @PrimaryColumn()
//     moduleId: number;
  
//     @ManyToOne(() => Comment, comment => comment.moduleConnection, { primary: true })
//     @JoinColumn({ name: "commentId" })
//     comment: Promise<Comment>;
  
//     @ManyToOne(() => Module, module => module.commentConnection, {
//       primary: true,
//     })
//     @JoinColumn({ name: "moduleId" })
//     module: Promise<Module>;
//   }