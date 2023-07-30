import * as crypto from 'crypto';
import { setSeederFactory } from 'typeorm-extension';
import { AuthEntity } from 'src/entities/auth.entity';
import { AuthTypeEnum } from 'src/enums/auth-type.enum';
import { AccountEntity } from 'src/entities/account.entity';

export default setSeederFactory(AuthEntity, () => {
  const account = new AccountEntity();

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync('Aa123456', salt, 1000, 64, 'sha512').toString('hex');

  const user = new AuthEntity();
  user.username = 'test1';
  user.password = hash;
  user.passwordSalt = salt;
  user.authType = AuthTypeEnum.APP_USERNAME;
  user.account = account;

  return user;
});
