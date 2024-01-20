import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { ClubEntity } from './entities/club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginCredentialDto } from 'src/users/dto/LoginCredentialDto';

import { UserRoleEnum } from 'src/enums/user-role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClubService {

  constructor(
    @InjectRepository(ClubEntity)
    private clubRepository: Repository<ClubEntity>,
    private jwtService: JwtService, 
  ) {}

  /* create(createClubDto: CreateClubDto) {
    return this.clubRepository.save(createClubDto);
  } */

  async create(clubData: CreateClubDto): Promise<Partial<ClubEntity>> {
    const club = this.clubRepository.create({
      ...clubData
    });
    club.salt = await bcrypt.genSalt();
    club.password = await bcrypt.hash(club.password, club.salt);
    try {
      await this.clubRepository.save(club);
    } catch (e) {
      throw new ConflictException(`Le username doit être unique`);
    }
    return {
        id: club.id,
        username: club.username,
        role: club.role
      } ;
    }


    async login(credentials: LoginCredentialDto)  {

      // Récupére le login et le mot de passe
       const {username, password} = credentials;
      // On peut se logger ou via le username ou le password
      // Vérifier est ce qu'il y a un club avec ce login ou ce mdp
      const club = await this.clubRepository.createQueryBuilder("club")
        .where("club.username = :username" ,
          {username}
          )
        .getOne();
      // console.log(club);
      // Si not club je déclenche une erreur
  
      if (!club)
        throw new NotFoundException('username ou password erronée');
      // Si oui je vérifie est ce que le mot est correct ou pas
      const hashedPassword = await bcrypt.hash(password, club.salt);
      if (hashedPassword === club.password) {
        const payload = {
          username: club.username,
          name: club.name,
          field: club.field,
          role: club.role
        };
        const jwt = await this.jwtService.sign(payload);
        return {
          "access_token" : jwt
        };
      } else {
        // Si mot de passe incorrect je déclenche une erreur
        throw new NotFoundException('username ou password erronée');
      }
    } 


  findAll() {
    return this.clubRepository.find();
  }

  findOne(id: number) {
    return this.clubRepository.findOneBy({ id });
  }

  async update(id: number, updateClubDto: UpdateClubDto) {
    const clubToUpdate = await this.clubRepository.preload({
      id,
      ...updateClubDto
    });
    // tester le cas ou l'utilisateur d'id id n'existe pas
    if(! clubToUpdate) {
      throw new NotFoundException(`L'utilisateur d'id ${id} n'existe pas`);
    }
    //sauvgarder l'utilisateur apres modification'
    return await this.clubRepository.save(clubToUpdate);
  
  }

  async softDeleteClub(id: number /* club */) {
    const elmnt = await this.clubRepository.findOneBy({id});
    if (!elmnt) {
      throw new NotFoundException('');
    }
   // if (this.userService.isOwnerOrAdmin(cv, club))
      return  this.clubRepository.softDelete(id);
   // else
    //  throw new UnauthorizedException('');
  }


  async restoreClub(id: number, /* club */) {

    const club = await this.clubRepository.query("select * from club_entity where id = ?", [id]);
    if (!club) {
      throw new NotFoundException('club not found');
    }
   // if (this.userService.isOwnerOrAdmin(cv, club))
      return this.clubRepository.restore(id);
   // else
    //  throw new UnauthorizedException('');
  }


  isOwnerOrAdmin(object, club) {
    return club.role === UserRoleEnum.ADMIN || (object.club && object.club.id === club.id);
  }



}
