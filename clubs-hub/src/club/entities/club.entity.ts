import { TimestampEntites } from "src/Generics/timestamps.entities";
import { EventEntity } from "src/event/entities/event.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClubEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  field: string;

  @Column()
  creationDate : Date ;
 
  @ManyToMany(type => UserEntity)
  members: UserEntity[];

  @OneToMany(type => PostEntity, post => post.owner)
  posts: PostEntity[];

  @OneToMany(type => EventEntity, event => event.organizer)
  events: EventEntity[];


}
