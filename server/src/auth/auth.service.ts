import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
// import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async register(registerAuthDto: RegisterAuthDto) {
    console.log(registerAuthDto);
    // try {
    //   const { password } = registerAuthDto;
    //   const plainToHash = await hash(password, 10);
    //   registerAuthDto = { ...registerAuthDto, password: plainToHash };
    //   return this.userRepository.create(registerAuthDto);
    // } catch (error) {
    //   throw ErrorManager.createSignatureError(error.message);
    // }
  }

  public async login(loginAuthDto: LoginAuthDto) {
    console.log(loginAuthDto);
    return 'This action adds a new auth';
  }
}
