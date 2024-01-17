import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  
  
   create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  /* async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.usersRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    userToUpdate.firstName = updateUserDto.firstName ?? userToUpdate.firstName;
    userToUpdate.lastName = updateUserDto.lastName ?? userToUpdate.lastName;
    await this.usersRepository.save(userToUpdate);
    return userToUpdate; 
  } */
  async update(id: number, updateUserDto: UpdateUserDto) {
  const userToUpdate = await this.usersRepository.preload({
    id,
    ...updateUserDto
  });
  // tester le cas ou l'utilisateur d'id id n'existe pas
  if(! userToUpdate) {
    throw new NotFoundException(`L'utilisateur d'id ${id} n'existe pas`);
  }
  //sauvgarder l'utilisateur apres modification'
  return await this.usersRepository.save(userToUpdate);

}




  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  } 
}
