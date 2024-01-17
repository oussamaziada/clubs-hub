import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  likes: number;

  @ManyToOne(type => User, user => user.posts)
  owner : User
}
