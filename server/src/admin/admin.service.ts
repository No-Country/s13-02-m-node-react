// admin.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ROLES } from '../config/constants/roles';
import { UsersEntity } from '../users/entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createAdminIfNotExists() {
    try {
      const adminEmail = this.configService.get('ADMIN_EMAIL');
      const adminPassword = this.configService.get('ADMIN_PASSWORD');

      const admin = await this.userRepository.findOne({
        where: { role: ROLES.ADMIN, username: 'admin' },
      });

      if (!admin) {
        if (!adminEmail || !adminPassword) {
          throw new Error('ADMIN ACCOUNT NOT CONFIGURED.');
        }
        const hashedPassword = await hash(adminPassword, 10);

        const newAdmin = await this.userRepository.save({
          username: 'admin',
          email: adminEmail,
          password: hashedPassword,
          role: ROLES.ADMIN,
        });

        if (!newAdmin) {
          console.log('Admin account creation failed.');
          throw new Error('Admin account creation failed.');
        } else {
          console.log('Admin account created.');
        }
      }

      console.log('ADMIN ACCOUNT READY... ');
    } catch (error) {
      console.error(error);
    }
  }
}
