import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}


  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return  this.postRepository.findOneBy({ id });
  }

  
  async update(id: number, updatePostDto: UpdatePostDto) {
    const postToUpdate = await this.postRepository.preload({
      id,
      ...updatePostDto
    });
    // tester le cas ou l'utilisateur d'id id n'existe pas
    if(! postToUpdate) {
      throw new NotFoundException(`L'utilisateur d'id ${id} n'existe pas`);
    }
    //sauvgarder l'utilisateur apres modification'
    return await this.postRepository.save(postToUpdate);
  }
  
  
  async remove(id: number) {
    return await this.postRepository.delete(id);
  }


  async addLike(postId : number): Promise<PostEntity> {
    const post = await this.postRepository.findOneBy({id : postId }) ;

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // Increment the likes count
    post.likes += 1;

    // Save the updated post to the database
    await this.postRepository.save(post);

    return post;
  }
}
