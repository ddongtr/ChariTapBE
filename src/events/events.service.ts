import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from 'src/schemas/event.schema';
import { UsersService } from 'src/users/users.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import moment = require('moment');
@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly model: Model<EventDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const _status = await this.handleStatus(createEventDto);
    const submitted = await this.Submitted(createEventDto);
    const regist_permission = await this.registCheck(createEventDto);
    if (submitted < 3) {
      return await new this.model({
        ...createEventDto,
        status: _status,
        regist_permission: regist_permission,
        rating: [],
      }).save();
    } else {
      return {
        msg: 'Bạn đang tổ chức nhiều hơn 3 sự kiện!',
      };
    }
  }

  async findAll(): Promise<Event[]> {
    return await this.model.find().sort({start: -1}).exec();
  }

  async findByHost(host: string): Promise<Event[]> {
    return await this.model.find({ host: host }).exec();
  }

  async findByJoiner(joiner: string): Promise<Event[]> {
    return await this.model.find({joiners: {$elemMatch: {_id:joiner}}}).exec();
  }

  async findOne(id: string): Promise<Event> {
    const document = await this.model.findById(id).exec();
    return document
      ? await this.refreshing(document)
      : {
          msg: 'none',
        };
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.model.findByIdAndUpdate(id, updateEventDto).exec();
    return {
      msg: 'updated',
    };
  }

  async remove(id: string) {
    await this.model.findByIdAndRemove(id).exec();
    return {
      msg: 'deleted',
    };
  }

  //functions for handling
  //-------------------------------------------
  //set status follow date
  async handleStatus(createEventDto: CreateEventDto) {
    const now = moment().format('DD/MM/YYYY'); //get date of moment
    const START = createEventDto.start; //start date of event
    const END = createEventDto.end; //end date of event
    const REGIST_FROM = createEventDto.regist_from; //get start registing date of event

    if (now < REGIST_FROM) {
      return 'preparing';
    } else if (now < START) {
      return 'registing';
    } else if (now < END) {
      return 'happening';
    } else {
      return 'closed';
    }
  }

  //number of the document create by an user
  async Submitted(createEventDto: CreateEventDto) {
    const list = await (await this.findByHost(createEventDto.host)).length;
    return list;
  }

  //check participants of an event
  async registCheck(createEventDto: CreateEventDto) {
    const MAX = createEventDto.max_registers;
    const PARTICIPATED = createEventDto.joiners.length;

    if (PARTICIPATED < MAX) {
      return 'Đăng ký';
    } else {
      return 'Đã đủ số người đăng ký';
    }
  }

  //refresh infor of an event before get data
  async refreshing(document: any) {
    const status = await this.handleStatus(document);
    const permission = await this.registCheck(document);

    return {
      ...document._doc,
      status: status,
      regist_permission: permission,
    };
  }
}
