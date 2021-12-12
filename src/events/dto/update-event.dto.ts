import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  statusCode?: number;
  status?: string;
  rating?: [];
  joiners?: [];
}
