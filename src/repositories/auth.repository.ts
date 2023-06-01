// https://github.com/typeorm/typeorm/issues/9013#issuecomment-1177235341

import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { AuthEntity } from 'src/entities/auth.entity';
import { SignUpDto } from 'src/modules/auth/dto/sign-up.dto';
import { AccountEntity } from 'src/entities/account.entity';

@Injectable()
export class AuthRepository extends Repository<AuthEntity> {
  constructor(private dataSource: DataSource) {
    super(AuthEntity, dataSource.createEntityManager());
  }

  async createAuth(signUpDto: SignUpDto) {
    const { countryCode, phoneNumber, password } = signUpDto;

    // Creating a unique salt for a particular user
    const salt = crypto.randomBytes(16).toString('hex');

    // Hash the salt and password with 1000 iterations, 64 length and sha512 digest
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    let auth = this.create({ countryCode, phoneNumber, password: hash, passwordSalt: salt });

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      // execute queries using transactionalEntityManager

      // Create account data
      let account = transactionalEntityManager.create(AccountEntity, {});
      account = await transactionalEntityManager.save(account);
      auth.account = account;

      // Create auth data
      auth = await transactionalEntityManager.save(AuthEntity, auth);
    });

    return auth;
  }
}
