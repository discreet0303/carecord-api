import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthController } from '../auth.controller';

export const AuthTestModule = Test.createTestingModule({
  controllers: [AuthController],
  providers: [AuthService],
});
