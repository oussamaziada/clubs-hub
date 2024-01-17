import { Post } from "src/post/entities/post.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(type => Post, post => post.owner)
  posts: Post[];

  
}
