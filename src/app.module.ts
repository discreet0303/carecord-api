import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmModuleConfig } from './config/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ContactBookUserModule } from './modules/contact-book-user/contact-book-user.module';
import { ContactBookModule } from './modules/contact-book/contact-book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmModuleConfig),
    AuthModule,
    ContactBookUserModule,
    ContactBookModule,
  ],
})
export class AppModule {}
