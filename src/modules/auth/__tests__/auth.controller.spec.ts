import { TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthTestModule } from './auth.module.test';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await AuthTestModule.compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
