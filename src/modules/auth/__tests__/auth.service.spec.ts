import { TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthTestModule } from './auth.module.test';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await AuthTestModule.compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
