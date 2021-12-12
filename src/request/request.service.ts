import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventsService } from 'src/events/events.service';
import { RequestDocument } from 'src/schemas/request.schema';
import { UsersService } from 'src/users/users.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel('Request') private readonly model: Model<RequestDocument>,
    private readonly userService: UsersService,
    private readonly eventService: EventsService,
  ) {}

  async findAll() {
    return await this.model.find().sort({ start: -1 }).exec();
  }

  async findOne(id: string) {
    return await this.model.findById(id).exec();
  }

  async create(createRequestDto: CreateRequestDto) {
    const submitted = await this.Submitted(createRequestDto);
    if (submitted < 3) {
      return await new this.model({
        ...createRequestDto,
        rating: [],
        status: 'wait',
        statusCode: -1,
      }).save();
    } else {
      return {
        msg: 'Bạn đang tổ chức nhiều hơn 3 sự kiện!',
      };
    }
  }

  async approving(
    admin: string,
    id: string,
    createRequestDto: CreateRequestDto,
  ) {
    if (admin == '619b3dc446350aed934841d5') {
      if (createRequestDto.status == 'approve') {
        await this.model.findByIdAndDelete(id);
        return await this.eventService.create(createRequestDto);
      } else {
        return await this.model.findByIdAndUpdate(id, createRequestDto).exec();
      }
    } else {
      return { msg: 'Bạn không có quyền duyệt!' };
    }
  }

  async findByHost(host: string) {
    return await this.model.find({ host: host }).exec();
  }

  //minimal functions
  async Submitted(createEventDto: CreateRequestDto) {
    const list = await (
      await this.eventService.findByHost(createEventDto.host)
    ).length;
    return list;
  }
}
