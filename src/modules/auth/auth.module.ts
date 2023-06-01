import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import ENV_CONFIG from 'src/config/env';
import { AuthEntity } from 'src/entities/auth.entity';
import { AuthRepository } from 'src/repositories/auth.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.register({
      global: true,
      secret: ENV_CONFIG.auth.jwt.secretKey,
      signOptions: { expiresIn: ENV_CONFIG.auth.jwt.expiredAt },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthRepository],
})
export class AuthModule {}
