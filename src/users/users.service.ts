import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<Omit<Users, 'password'>> {
    const { username, password } = createUserDto;

    const existingUser = await this.userRepo.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepo.create({
      username,
      password: hashedPassword,
    });
    const savedUser = await this.userRepo.save(newUser);

    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async findByUsername(username: string): Promise<Users | undefined> {
    const user = await this.userRepo.findOne({ where: { username } });
    return user ?? undefined;
  }
}
