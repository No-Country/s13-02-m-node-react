import { PartialType } from '@nestjs/swagger';
import { CreateProgressThemeDto } from './create-progress-theme.dto';

export class UpdateProgressThemeDto extends PartialType(
  CreateProgressThemeDto,
) {}
