import { IsNotEmpty, IsOptional } from "class-validator";
import { UsersEntity } from "../entities/user.entity";

export class UserQueryDto {

  @IsNotEmpty()
  data: UsersEntity[];

  @IsOptional()
    pagination: 
      { totalPages: number; 
        limit: number; 
        page: number; 
      }