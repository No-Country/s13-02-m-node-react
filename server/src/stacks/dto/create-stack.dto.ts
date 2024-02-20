import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';
import { ThemesEntity } from 'src/themes/entities/theme.entity';
export class CreateStackDto {
    
    @IsString()
    name: string;

    @IsNumber()
    @IsPositive()
    points:number

    @ValidateNested({ each: true })
    @Type(() => ThemesEntity)
    themes: ThemesEntity[]
    // The theme is not saved in the database
}
