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
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.requestService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('approve')
  approve(@Body() param: any) {
    return this.requestService.approving(param.admin, param.id, param.param);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':host')
  findHost(@Param('host') host: string) {
    return this.requestService.findByHost(host);
  }
}
