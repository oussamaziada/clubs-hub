import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { ClubEntity } from './entities/club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClubService {

  constructor(
    @InjectRepository(ClubEntity)
    private clubRepository: Repository<ClubEntity>,
  ) {}

  create(createClubDto: CreateClubDto) {
    return this.clubRepository.save(createClubDto);
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

  async softDeleteClub(id: number /* user */) {
    const elmnt = await this.clubRepository.findOneBy({id});
    if (!elmnt) {
      throw new NotFoundException('');
    }
   // if (this.userService.isOwnerOrAdmin(cv, user))
      return  this.clubRepository.softDelete(id);
   // else
    //  throw new UnauthorizedException('');
  }


  async restoreClub(id: number, /* user */) {

    const club = await this.clubRepository.query("select * from club_entity where id = ?", [id]);
    if (!club) {
      throw new NotFoundException('club not found');
    }
   // if (this.userService.isOwnerOrAdmin(cv, user))
      return this.clubRepository.restore(id);
   // else
    //  throw new UnauthorizedException('');
}
}
