import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { DataSourceOption } from 'src/config/typeorm';
import UserSeeder from './seeds/user.seeder';
import ContactBookUserSeeder from './seeds/contact-book-user.seeder';
import ContactBookQuestionSeeder from './seeds/contact-book-question.seeder';

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    ...DataSourceOption,
    seeds: [UserSeeder, ContactBookUserSeeder, ContactBookQuestionSeeder],
    factories: ['src/database/seeds/*.factory.ts'],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
})();
