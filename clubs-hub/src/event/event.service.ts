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


  async create(createEventDto: CreateEventDto, user): Promise<EventEntity> {
    if (user.role === 'admin' || user.role === 'club') {
      const newEvent = this.eventRepository.create(createEventDto);
      newEvent.organizer = user;
      await this.eventRepository.save(newEvent);
      return newEvent;
    }
    else
      throw new NotFoundException(`Vous n'avez pas le droit de créer un evenement`);
  }

  findAll() {
    return this.eventRepository.find();
  }

  findOne(id: number) {
    return this.eventRepository.findOneBy({ id });
  }

  findByClubId(id: number) {
    return this.eventRepository
    .createQueryBuilder('event')
    .innerJoin('event.organizer', 'organizer')
    .where('organizer.id = :id', { id })
    .getMany();
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

  findLastFiveEvents() {
    return this.eventRepository.find({
      order: {
        id: 'DESC', // assuming that the id is auto-incremented
      },
      take: 5,
    });
  }
}
