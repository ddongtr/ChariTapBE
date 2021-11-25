import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { EventsModule } from 'src/events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from 'src/schemas/request.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [EventsModule, UsersModule,
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),]
})
export class RequestModule {}
