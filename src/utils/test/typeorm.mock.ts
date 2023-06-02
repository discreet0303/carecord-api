import { DataSource } from 'typeorm';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(() => ({
  createEntityManager: jest.fn(),
  create: jest.fn((entity) => entity),
  find: jest.fn(),
  findOne: jest.fn((entity) => entity),
  findOneBy: jest.fn((entity) => entity),
  findOneOrFail: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
  update: jest.fn((entity) => entity),
  softDelete: jest.fn((entity) => entity),
  createQueryBuilder: jest.fn(() => ({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis(),
  })),
}));
