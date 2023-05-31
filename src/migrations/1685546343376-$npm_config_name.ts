import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1685546343376 implements MigrationInterface {
  name = ' $npmConfigName1685546343376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "username" character varying, "avatar" character varying, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."auth_auth_type_enum" AS ENUM('APP', 'ORG_WEB')`);
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" SERIAL NOT NULL, "country_code" character varying NOT NULL, "phone_number" character varying NOT NULL, "password" character varying NOT NULL, "auth_type" "public"."auth_auth_type_enum" NOT NULL DEFAULT 'APP', "account_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "REL_785427223fe40c51673bf49526" UNIQUE ("account_id"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
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
