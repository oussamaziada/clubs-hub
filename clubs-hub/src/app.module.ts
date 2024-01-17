import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forRoot({
    /* type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,*/
    //entities: ['dist/**/*.entity{.ts,.js}'],
    //synchronize: true, 
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'clubs-hub',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
  }),UsersModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
