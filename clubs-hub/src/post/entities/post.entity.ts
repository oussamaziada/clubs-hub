import { TimestampEntites } from "src/Generics/timestamps.entities";
import { ClubEntity } from "src/club/entities/club.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";


@Entity('post')
export class PostEntity extends TimestampEntites{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  likes: number;

  @ManyToOne(type => ClubEntity, club => club.posts, {onDelete: 'CASCADE',eager : true})
  owner : ClubEntity ;}
