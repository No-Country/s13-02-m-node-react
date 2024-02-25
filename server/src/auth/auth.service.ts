/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersEntity } from '../users/entities/user.entity';
import { ErrorManager } from '../utils/error.manager';
import { hash, compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IJWTPayload } from '../types/interfaces/auth.interface';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * @Service Register - Handles the registration of a new user.
   * @param registerAuthDto An object containing user registration data.
   * @returns An object indicating the success of the registration with a message.
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   * @throws ErrorManager with type 'BAD_REQUEST' and a message if the provided email or username is already in use.
   */
  public async register(registerAuthDto: RegisterAuthDto) {
    try {
      registerAuthDto.email = registerAuthDto.email.toLowerCase();
      const isEmail = await this.usersService.findUserBy({
        field: 'email',
        value: registerAuthDto.email,
      });
      if (isEmail) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Email already in use',
        });
      }
      const isUsername = await this.usersService.findUserBy({
        field: 'username',
        value: registerAuthDto.username,
      });

      if (isUsername) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Username already in use',
        });
      }
      registerAuthDto.password = await hash(registerAuthDto.password, 10);
      await this.usersService.create(registerAuthDto);
      return { message: 'User Created' };
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * @service Login - Handles the user login process.
   * @param loginAuthDto An object containing user login credentials (email and password).
   * @returns A JWT token upon successful login.
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   * @throws ErrorManager with type 'UNAUTHORIZED' and a message if the provided identity or password is incorrect.
   */
  public async login(loginAuthDto: LoginAuthDto) {
    try {
      loginAuthDto.email = loginAuthDto.email.toLowerCase();
      const { email, password } = loginAuthDto;
      const userValidate = await this.validateUser(email, password);
      console.log(
        'email ',
        email,
        ' password: ',
        password,
        ' user:',
        userValidate,
      );
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
  }

  /**
   * @function validateUser - Validates user credentials (email and password) during the login process.
   * @param user The user identity (email) for validation.
   * @param password The password for validation.
   * @returns The user object if validation is successful, otherwise returns undefined.
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   */
  public async validateUser(email: string, password: string) {
    try {
      const userToValidate = await this.usersService.findUserBy({
        field: 'email',
        value: email,
      });
      console.log('USER : ', userToValidate);
      if (!userToValidate) {
        console.log('no User found');
        return undefined;
      }
      const match = await compare(password, userToValidate.password);
      if (!match) {
        console.log('no pass match');
        return undefined;
      }
      return userToValidate;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * @function SignJWT - Signs a JSON Web Token (JWT) with the provided payload.
   * @param payload The payload to be included in the JWT.
   * @returns The signed JWT token.
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   */
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
  }

  /**
   * @function generateJWT Generates a JSON Web Token (JWT) for the provided user.
   * @param user<UsersEntity> - The user entity for whom the JWT is generated.
   * @returns An object containing the access token and user information.
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   */
  public async generateJWT(user: UsersEntity): Promise<any> {
    try {
      const getUser = await this.usersService.findUserById(user.id);
      const payload: IJWTPayload = {
        user: { role: getUser.role, id: getUser.id },
      };
      const response = { accessToken: await this.signJWT(payload), getUser };
      return response;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
