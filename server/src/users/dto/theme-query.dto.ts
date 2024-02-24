import { IsOptional, IsIn, IsNotEmpty, ValidateIf } from 'class-validator';
import { IsNumericString } from 'src/utils/validator.decorator';

export class UserQueryDto {
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  @IsOptional()
  @IsNotEmpty()
  orderBy?: string;

  @IsOptional()
  @IsNumericString()
  @ValidateIf((o) => o.page !== undefined)
  page?: number | string;

  @IsOptional()
  @IsNumericString()
  @ValidateIf((o) => o.limit !== undefined)
  limit?: number | string;
}
