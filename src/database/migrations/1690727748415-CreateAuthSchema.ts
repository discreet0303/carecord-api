import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthSchema1690727748415 implements MigrationInterface {
  name = 'CreateAuthSchema1690727748415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" character varying, "avatar" character varying, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."auth_auth_type_enum" AS ENUM('APP_USERNAME', 'APP_EMAIL', 'APP_GOOGLE', 'APP_APPLE', 'ORG_WEB')`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "password_salt" character varying NOT NULL, "auth_type" "public"."auth_auth_type_enum" NOT NULL DEFAULT 'APP_USERNAME', "is_verified" boolean NOT NULL DEFAULT false, "account_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_366ebf23d8f3781bb7bb37abbd1" UNIQUE ("username"), CONSTRAINT "REL_785427223fe40c51673bf49526" UNIQUE ("account_id"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" ADD CONSTRAINT "FK_785427223fe40c51673bf49526d" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_785427223fe40c51673bf49526d"`);
    await queryRunner.query(`DROP TABLE "auth"`);
    await queryRunner.query(`DROP TYPE "public"."auth_auth_type_enum"`);
    await queryRunner.query(`DROP TABLE "account"`);
  }
}
