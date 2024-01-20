import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from './entities/club.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';


dotenv.config();
@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity]),PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600
      }
    })],
  controllers: [ClubController],
  providers: [ClubService],
  exports: [ClubService,TypeOrmModule.forFeature([ClubEntity])]
})
export class ClubModule {}
