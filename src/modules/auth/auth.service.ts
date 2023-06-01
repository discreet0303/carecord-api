import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { AuthEntity } from 'src/entities/auth.entity';
import { AuthRepository } from 'src/repositories/auth.repository';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository, private readonly jwtService: JwtService) {}

  async signIn(signInDto: SignInDto) {
    const { countryCode, phoneNumber, password } = signInDto;

    const auth = await this.authRepository.findOne({ where: { countryCode, phoneNumber } });

    if (!auth) throw new UnauthorizedException('User not found.');

    // To verify the same - salt (stored in DB) with same other parameters used while creating hash (1000 iterations, 64 length and sha512 digest)
    const hashPassword = crypto
      .pbkdf2Sync(password, auth.passwordSalt, 1000, 64, 'sha512')
      .toString('hex');

    if (hashPassword !== auth.password) throw new UnauthorizedException('Password is not correct.');

    const token = this.getJwtToken(auth);

    return { token, auth };
  }

  async signUp(signUpDto: SignUpDto) {
    const { countryCode, phoneNumber } = signUpDto;

    let auth = await this.authRepository.findOne({ where: { countryCode, phoneNumber } });

    if (auth) throw new UnauthorizedException('User is exist.');

    auth = await this.authRepository.createAuth(signUpDto);

    const token = this.getJwtToken(auth);

    return { token, auth };
  }

  getJwtToken(auth: AuthEntity) {
    return this.jwtService.sign({ sub: auth.id });
  }
}
