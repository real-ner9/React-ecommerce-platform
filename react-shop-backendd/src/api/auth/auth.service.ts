import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import Role from '../user/role.enum';

import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthHelper } from './auth.helper';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(AuthHelper) private readonly authHelper: AuthHelper,
    @Inject(UserService) private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password }: RegisterDto = body;
    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new HttpException(
        {
          message: ['Почта занята'],
        },
        HttpStatus.CONFLICT,
      );
    }

    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');

    const user = new User();

    user.name = name ?? null;
    user.email = email;
    user.password = this.authHelper.encodePassword(password);

    if (adminEmail && email === adminEmail) {
      user.role = Role.Admin;
    }

    return this.userRepository.save(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        {
          message: ['Пользователь не найден'],
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid: boolean = this.authHelper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        {
          message: ['Почта или пароль введены не верно'],
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepository.update(user.id, { lastLoginAt: new Date() });

    return this.authHelper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    await this.userRepository.update(user.id, { lastLoginAt: new Date() });

    return this.authHelper.generateToken(user);
  }

  public getUsernameIPkey(username: string, ip: string): string {
    return `${username}_${ip}`;
  }
}
