import { CredentialsDto } from './../user/dio/credentials.dto';
import { CreateUserDto } from './../user/dio/create-user.dto';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) { }

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    await this.userService.create(createUserDto);
  }

  async signIn(credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = credentialsDto;
    const user = await this.userService.findOneName(username);

    if (user && await (bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }

    throw new UnauthorizedException('ユーザー名またはパスワードが正しくありません');
  }
}
