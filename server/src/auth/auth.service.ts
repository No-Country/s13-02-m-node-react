/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async register(registerAuthDto: RegisterAuthDto) {
    // console.log(registerAuthDto);
    try {
      const { password } = registerAuthDto;
      const plainToHash = await bcrypt.hash(password, 10);
      registerAuthDto = { ...registerAuthDto, password: plainToHash };

      return this.userRepository.save(registerAuthDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async login(loginAuthDto: LoginAuthDto) {
    try{
      const { email, password } = loginAuthDto;
      
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw ErrorManager.createSignatureError('User not found');
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw ErrorManager.createSignatureError('Invalid credentials');
      }
      return { user: user.id, token: 'token', role: user.role };
    }catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }

    // console.log(loginAuthDto);
    // return 'This action adds a new auth';
  }
}
