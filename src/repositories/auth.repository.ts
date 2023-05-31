// https://github.com/typeorm/typeorm/issues/9013#issuecomment-1177235341

import { Injectable } from '@nestjs/common';
import { AuthEntity } from 'src/entities/auth.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthRepository extends Repository<AuthEntity> {
  constructor(private dataSource: DataSource) {
    super(AuthEntity, dataSource.createEntityManager());
  }
}
