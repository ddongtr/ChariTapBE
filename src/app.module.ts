import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

require('dotenv').config()

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://dun:1234Qwer@cluster0.qpl25.mongodb.net/charitap?retryWrites=true&w=majority"), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
