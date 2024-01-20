import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubService } from 'src/club/club.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private clubService: ClubService,
  ) {}


  async create(createPostDto: CreatePostDto, user): Promise<PostEntity> {
    const newPost = this.postRepository.create(createPostDto);
    newPost.owner = user;
    await this.postRepository.save(newPost);
    return newPost;

    
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return  this.postRepository.findOneBy({ id });
  }

  
  async update(id: number, updatePostDto: UpdatePostDto, user) {
    const postToUpdate = await this.postRepository.preload({
      id,
      ...updatePostDto
    });
    if(! postToUpdate) {
      throw new NotFoundException(`L'utilisateur d'id ${id} n'existe pas`);
    }
    if (this.clubService.isOwnerOrAdmin(user, postToUpdate))
      return await this.postRepository.save(postToUpdate);
    else
      throw new NotFoundException(`Vous n'avez pas le droit de modifier ce post`);
  
    
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
