import { Repository } from 'typeorm';
import { Request } from 'express';

import { Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateNameDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import Role from './role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.name = body.name ?? null;

    return this.userRepository.save(user);
  }

  public findUser(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id },
      relations: ['cart.product', 'favorite.product'],
    });
  }

  public findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { email },
    });
  }

  public async markEmailAsConfirmed(email: string) {
    return this.userRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }

  public async updateRole(id: number, role: Role): Promise<User> {
    if (role === Role.Admin) {
      throw new ForbiddenException('Нельзя назначить роль Admin');
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (user.role === Role.Admin) {
      throw new ForbiddenException('Нельзя изменить роль Admin');
    }

    user.role = role;
    return this.userRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.find({ order: { id: 'ASC' } });
  }
}
