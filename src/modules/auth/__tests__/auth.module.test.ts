import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { AuthRepository } from 'src/repositories/auth.repository';
import { dataSourceMockFactory } from 'src/utils/test/typeorm.mock';
import { AuthService } from '../auth.service';
import { AuthController } from '../auth.controller';

export const AuthTestModule = Test.createTestingModule({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    { provide: AuthRepository, useFactory: dataSourceMockFactory },
    { provide: DataSource, useFactory: dataSourceMockFactory },
  ],
});
