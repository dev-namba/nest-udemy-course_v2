import { CreateUserDto } from './../user/dio/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private readonly userService: UserService) { }

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    await this.userService.create(createUserDto);
  }
}
