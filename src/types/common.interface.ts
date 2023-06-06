import { Request } from 'express';
import { AuthEntity } from 'src/entities/auth.entity';

export interface IRequest extends Request {
  user?: AuthEntity;
}
