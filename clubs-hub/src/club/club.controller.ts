import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Public } from 'src/decorators/public.decorator';
import { LoginCredentialDto } from 'src/users/dto/LoginCredentialDto';
import { User } from 'src/decorators/user.decorator';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Public()
  @Post('signup')
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubService.create(createClubDto);
  }

  @Public()
  @Post('login')
  login(
    @Body() credentials: LoginCredentialDto
  ) {
    return this.clubService.login(credentials);
  }

  @Get()
  findAll() {
    return this.clubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
    return this.clubService.update(+id, updateClubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubService.softDeleteClub(+id);
  }

  @Put(':id')
  restore(@Param('id') id: string) {
    return this.clubService.restoreClub(+id);
  }
}
