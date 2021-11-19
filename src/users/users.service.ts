import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Payload } from 'src/schemas/user.schema';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import LoginDto from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(RegisterDto: RegisterDto) {
    const { username } = RegisterDto;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(RegisterDto);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  // return user object without password
  sanitizeUser(user: UserDocument) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async findByLogin(UserDto: LoginDto) {
    const { username, password } = UserDto;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  // the new methods
  async findByPayload(payload: Payload) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }
}
