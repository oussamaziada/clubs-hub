import { TimestampEntites } from "src/Generics/timestamps.entities";
import { ClubEntity } from "src/club/entities/club.entity";
import { UserRoleEnum } from "src/enums/user-role.enum";
import { EventEntity } from "src/event/entities/event.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity extends TimestampEntites {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER
  })
  role: string;

  @ManyToMany(() => EventEntity)
  events: EventEntity[];

  @ManyToMany(() => ClubEntity)
  clubs: ClubEntity[];

  
  
  
}
