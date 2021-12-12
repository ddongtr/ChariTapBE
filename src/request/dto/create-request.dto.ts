export class CreateRequestDto {
  title: string;
  description: string;
  start: string;
  end: string;
  regist_from: string;
  regitst_to: string;
  min_registers: number;
  max_registers: number;
  host: string;
  image?: string;
  joiners?: [];
  status?: string;
  statusCode?: number;
}
