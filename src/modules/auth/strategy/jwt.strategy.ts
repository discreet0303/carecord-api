import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import ENV_CONFIG from 'src/config/env';
import { AuthRepository } from 'src/repositories/auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authRepository: AuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV_CONFIG.auth.jwt.secretKey,
    });
  }

  validate(payload: { sub: number }) {
    const { sub } = payload;

    return this.authRepository.findOne({ where: { id: sub } });
  }
}
