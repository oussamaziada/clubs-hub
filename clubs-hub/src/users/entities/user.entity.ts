import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  
  @OneToMany(type => PostEntity, post => post.owner)
  posts: PostEntity[];

  
}
