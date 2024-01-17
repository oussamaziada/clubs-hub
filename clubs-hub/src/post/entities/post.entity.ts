import { UserEntity } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";


@Entity('post')
export class PostEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  likes: number;

  @ManyToOne(type => UserEntity, user => user.posts)
  owner : UserEntity ;}
