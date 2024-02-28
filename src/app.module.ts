import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestLogSchema } from './modules/request-log/request-log.shema';
import { RequestLogService } from './modules/request-log/request-log.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017'), // Aquí especifica la base de datos
    MongooseModule.forFeature([
      { name: 'RequestLog', schema: RequestLogSchema },
    ]),
    PostsModule,
  ],
  providers: [RequestLogService],
})
export class AppModule {}

 