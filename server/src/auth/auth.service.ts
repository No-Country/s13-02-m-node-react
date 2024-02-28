import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersEntity } from '../users/entities/user.entity';
import { ErrorManager } from '../utils/error.manager';
import * as jwt from 'jsonwebtoken';
import { IJWTPayload } from '../types/interfaces/auth.interface';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {} // Create a user

  public async register(registerAuthDto: RegisterAuthDto) {
    try {
      registerAuthDto.email = registerAuthDto.email.toLowerCase();
      return this.usersService.create(registerAuthDto);
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  } // Login user

  public async login(loginAuthDto: LoginAuthDto) {
    try {
      const email = loginAuthDto.email.toLowerCase();
      const password = loginAuthDto.password;
      const userValidate = await this.validateUser({
        email,
        password,
      });
      if (!userValidate) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Wrong identity or password',
        });
      }
      return await this.generateJWT(userValidate);
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  } // Validate email and password

  public async validateUser(data) {
    try {
      const userToValidate = await this.usersService.findUserBy({
        field: 'email',
        value: data.email,
      });
      if (!userToValidate) {
        return undefined;
      }
      const match = await compare(data.password, userToValidate.password);
      if (!match) {
        return undefined;
      }
      return userToValidate;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  } // Sign Token

  public async signJWT(payload: jwt.JwtPayload) {
    try {
      const token = jwt.sign(
        payload,
        this.configService.get('JWTAUTH_SECRET'),
        {
          expiresIn:
            +this.configService.get('JWTAUTH_EXPIRESIN') * 60 * 60 * 1000,
        },
      );

      return token;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  } // Generate Token

  public async generateJWT(user: UsersEntity): Promise<any> {
    try {
      const getUser = await this.usersService.findUserById(user.id);
      const payload: IJWTPayload = {
        user: { role: getUser.role, id: getUser.id },
      };
      const userData = getUser.avatar
        ? { avatar: getUser.avatar }
        : { username: getUser.username };
      const response = {
        accessToken: await this.signJWT(payload),
        userid: getUser.id,
        ...userData,
      };
      return response;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
