import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dio/create-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const item = this.userRepository.create({
      username: username,
      password: hash,
      status: status,
    });
    return this.userRepository.save(item);
  }

  async findOneName(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user) {
      return undefined;
    }
    return user;
  }

  async findOneIdName(id: string, username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
        username: username
      }
    });
    if (!user) {
      return undefined;
    }
    return user;
  }
}
