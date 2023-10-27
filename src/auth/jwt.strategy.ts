import { UserService } from 'src/user/user.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey123',
    });
  }

  async validate(payload: { id: string, username: string }): Promise<User> {
    const { id, username } = payload;
    const user = await this.userService.findOneIdName(id, username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}