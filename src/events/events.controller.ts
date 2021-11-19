import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':host')
  findHost(@Param('host') host: string) {
    return this.eventsService.findByHost(host);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/joiner/:id')
  findJoiner(@Param('id') id: string) {
    return this.eventsService.findByJoiner(id);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('id/:id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('id/:id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
