import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/schemas/event.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    UsersModule,
  ],
})
export class EventsModule {}
