import { TimestampEntites } from "src/Generics/timestamps.entities";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany,  PrimaryGeneratedColumn } from "typeorm";

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

}
