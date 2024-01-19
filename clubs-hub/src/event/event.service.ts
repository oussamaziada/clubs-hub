import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
  ) {}


  create(createEventDto: CreateEventDto) {
    return this.eventRepository.save(createEventDto);
  }

  findAll() {
    return this.eventRepository.find();
  }

  findOne(id: number) {
    return this.eventRepository.findOneBy({ id });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const userToUpdate = await this.eventRepository.preload({
      id,
      ...updateEventDto
    });
    // tester le cas ou l'utilisateur d'id id n'existe pas
    if(! userToUpdate) {
      throw new NotFoundException(`L'evenement d'id ${id} n'existe pas`);
    }
    //sauvgarder l'utilisateur apres modification'
    return await this.eventRepository.save(userToUpdate);
  
  }

  async softDeleteEvent(id: number, /* user */) {
    const event = await this.eventRepository.findOneBy({id});
    if (!event) {
      throw new NotFoundException('');
    }
   // if (this.userService.isOwnerOrAdmin(cv, user))
      return this.eventRepository.softDelete(id);
   // else
    //  throw new UnauthorizedException('');
  }

  async restoreEvent(id: number, /* user */) {

    const event = await this.eventRepository.query("select * from event_entity where id = ?", [id]);
    if (!event) {
      throw new NotFoundException('event not found');
    }
   // if (this.userService.isOwnerOrAdmin(cv, user))
      return this.eventRepository.restore(id);
   // else
    //  throw new UnauthorizedException('');
  }
}
