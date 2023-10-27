import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dio/create-user.dto';
import { CredentialsDto } from 'src/user/dio/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.authService.signUp(createUserDto);
  }


  @Post('signin')
  async signIn(@Body() credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
    return await this.authService.signIn(credentialsDto);
  }
}
