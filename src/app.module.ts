import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmModuleConfig } from './config/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ContactBookUserModule } from './modules/contact-book-user/contact-book-user.module';

@Module({
  imports: [TypeOrmModule.forRoot(OrmModuleConfig), AuthModule, ContactBookUserModule],
})
export class AppModule {}
