import { PartialType } from '@nestjs/mapped-types';
import { UpsertDetailDto } from './create-detail.dto';

export class UpdateDetailDto extends PartialType(UpsertDetailDto) {}
