/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class GetQuestionDto {
    @IsString()
    theme: string;

    @IsString()
    level: string;

    @IsString()
    id_thread?:string

    @IsString()
    id_user?:string
}
