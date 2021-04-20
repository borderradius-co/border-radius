import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, PrimaryColumn} from "typeorm"
import { User } from "./User";
import { Project } from "./Project";

@Entity()
export class Updoot extends BaseEntity {
  @Column({type: "int"})
  value: number 

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, user => user.updoots)
  user: User;

  @PrimaryColumn()
  projectId: number;

  @ManyToOne(() => Project, project => project.updoots, {
    onDelete: 'CASCADE'
  })
  project: Project;

}
