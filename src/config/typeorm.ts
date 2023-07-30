import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import ENV_CONFIG from './env';

export const OrmModuleConfig: TypeOrmModuleOptions = {
  type: ENV_CONFIG.db.type,
  host: ENV_CONFIG.db.host,
  port: ENV_CONFIG.db.port,
  username: ENV_CONFIG.db.username,
  password: ENV_CONFIG.db.password,
  database: ENV_CONFIG.db.database,
  entities: [path.join(__dirname, '/../**/*.entity.{js,ts}')],
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: ENV_CONFIG.db.dbDrop,
  synchronize: ENV_CONFIG.db.dbSync,
  logging: ENV_CONFIG.db.dbLogging,
  logger: ENV_CONFIG.db.dbLogger,
};

export const DataSourceOption: DataSourceOptions = {
  type: ENV_CONFIG.db.type,
  host: ENV_CONFIG.db.host,
  port: ENV_CONFIG.db.port,
  username: ENV_CONFIG.db.username,
  password: ENV_CONFIG.db.password,
  database: ENV_CONFIG.db.database,
  entities: [path.join(__dirname, '/../entities/*.entity.{js,ts}')],
  migrations: [path.join(__dirname, '/../database/migrations/*{.ts,.js}')],
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: ENV_CONFIG.db.dbDrop,
  synchronize: ENV_CONFIG.db.dbSync,
};

const OrmMigrationConfig = new DataSource(DataSourceOption);

export default OrmMigrationConfig;
