import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { RequestLogDocument } from '../modules/request-log/request-log.shema'; // Importa el tipo de documento del esquema de registro de solicitudes

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<RequestLogDocument[]> {
    // Usa el tipo de documento del esquema de registro de solicitudes
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<RequestLogDocument> {
    return this.postsService.getPostById(id);
  }

  @Post()
  async createPost(@Body() postData: any): Promise<any> {
    return this.postsService.createPost(postData);
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() postData: any): Promise<any> {
    return this.postsService.updatePost(id, postData);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }
}