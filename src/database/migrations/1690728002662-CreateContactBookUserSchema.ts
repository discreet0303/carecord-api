import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactBookUserSchema1690728002662 implements MigrationInterface {
  name = 'CreateContactBookUserSchema1690728002662';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."contact-book-user_type_enum" AS ENUM('BABE', 'ELDER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact-book-user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "uid" character varying NOT NULL, "type" "public"."contact-book-user_type_enum" NOT NULL, "birthday" date, "addition_data" json, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "owner_id" integer, CONSTRAINT "UQ_1ab5ab98093b83290d8d72d880f" UNIQUE ("uid"), CONSTRAINT "PK_58892674b852a85810fceb07c1e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."contact-book-user-relation_type_enum" AS ENUM('PARENT', 'CAREGIVER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact-book-user-relation" ("id" SERIAL NOT NULL, "type" "public"."contact-book-user-relation_type_enum" NOT NULL, "note" character varying, "is_active" boolean NOT NULL DEFAULT false, "is_owner" boolean, "contact_book_user_id" integer, "auth_id" integer, "created_by_id" integer, "deleted_by_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_4edf7cd2a701e28ba2c4b2d056a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user" ADD CONSTRAINT "FK_205269a49f1ae711ce385e637a2" FOREIGN KEY ("owner_id") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" ADD CONSTRAINT "FK_4921d37dc62d19090842e8b1f15" FOREIGN KEY ("auth_id") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" ADD CONSTRAINT "FK_eb6ee524f154a1bf1c9ebc6e47a" FOREIGN KEY ("contact_book_user_id") REFERENCES "contact-book-user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" ADD CONSTRAINT "FK_2f8fcdac993ccc2dd7045061ee2" FOREIGN KEY ("created_by_id") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" ADD CONSTRAINT "FK_23a88880a5b23e98231ed9c2a20" FOREIGN KEY ("deleted_by_id") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" DROP CONSTRAINT "FK_23a88880a5b23e98231ed9c2a20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" DROP CONSTRAINT "FK_2f8fcdac993ccc2dd7045061ee2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" DROP CONSTRAINT "FK_eb6ee524f154a1bf1c9ebc6e47a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" DROP CONSTRAINT "FK_4921d37dc62d19090842e8b1f15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user" DROP CONSTRAINT "FK_205269a49f1ae711ce385e637a2"`,
    );
    await queryRunner.query(`DROP TABLE "contact-book-user-relation"`);
    await queryRunner.query(`DROP TYPE "public"."contact-book-user-relation_type_enum"`);
    await queryRunner.query(`DROP TABLE "contact-book-user"`);
    await queryRunner.query(`DROP TYPE "public"."contact-book-user_type_enum"`);
  }
}
