import { UserStatus } from 'src/auth/user-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dio/create-user.dto';
import { User } from './entity/user.entity';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;

    const item = this.userRepository.create({
      username: username,
      password: password,
      status: status,
    });
    return this.userRepository.save(item);
  }
}
