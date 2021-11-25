import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { RequestModule } from './request/request.module';
import dotenv = require('dotenv');
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dun:1234Qwer@cluster0.qpl25.mongodb.net/charitap?retryWrites=true&w=majority',
    ),
    UsersModule,
    AuthModule,
    EventsModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    dotenv.config();
  }
}
