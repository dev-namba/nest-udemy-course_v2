import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dio/create-user.dto';


@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) { }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<void> {
    await this.userService.create(createUserDto);
  }
}
