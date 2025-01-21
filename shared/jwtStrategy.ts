import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from '../config/index';
import { IUserCService } from 'src/modules/user-c/interfaces/iuser-c.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('IUserCService')
    private readonly userCService: IUserCService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('Validating JWT payload:', payload);
    const user = await this.userCService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { ...user, roles: user.data.roles };
  }
}
