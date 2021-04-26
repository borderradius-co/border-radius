// import { User } from "./User";
// import { Article } from "./Article";
// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";

// @Entity()
// export class Opinion extends BaseEntity {  
//   @PrimaryColumn()
//   userId: number;

//   @ManyToOne(() => User, user => user.opinions)
//   user: User;

//   @PrimaryColumn()
//   articleId: number;

//   @Column()
//   text: string;

//   @ManyToOne(() => Article, article => article.opinions, {
//     onDelete: 'CASCADE'
//   })
//   article: Article;
// }
