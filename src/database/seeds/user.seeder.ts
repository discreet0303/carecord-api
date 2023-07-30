/* eslint-disable no-console */

import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AuthEntity } from 'src/entities/auth.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    console.log('[UserSeeder] running...');

    const userFactory = factoryManager.get(AuthEntity);
    await userFactory.save();

    console.log('[UserSeeder] end');
  }
}
