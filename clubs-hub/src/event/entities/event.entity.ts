import { TimestampEntites } from "src/Generics/timestamps.entities";
import { ClubEntity } from "src/club/entities/club.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EventEntity extends TimestampEntites {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  place: string;

  @Column()
  date: Date;

  @ManyToMany(() => UserEntity)
  participants: UserEntity[];

  @ManyToOne(
    type => ClubEntity,
    (club) => club.events )
  organizer : ClubEntity ;
}
