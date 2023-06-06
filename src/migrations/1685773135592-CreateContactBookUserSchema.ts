import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactBookUserSchema1685773135592 implements MigrationInterface {
  name = 'CreateContactBookUserSchema1685773135592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."contact-book-user_type_enum" AS ENUM('BABE', 'ELDER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact-book-user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" "public"."contact-book-user_type_enum" NOT NULL, "birthday" date, "addition_data" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_58892674b852a85810fceb07c1e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."contact-book-user-relation_type_enum" AS ENUM('OWNER', 'CAREGIVER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact-book-user-relation" ("id" SERIAL NOT NULL, "country_code" character varying NOT NULL, "phone_number" character varying NOT NULL, "type" "public"."contact-book-user-relation_type_enum" NOT NULL, "note" character varying, "contact_book_user_id" integer, "created_by_id" integer, "deleted_by_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_99d397ab67e6b1dbc8bb43fe00e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" ADD CONSTRAINT "FK_9c0f66b137fe12fea1999fd952d" FOREIGN KEY ("contact_book_user_id") REFERENCES "contact-book-user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" ADD CONSTRAINT "FK_df6a54b12c322cc11e21f486a9f" FOREIGN KEY ("created_by_id") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" ADD CONSTRAINT "FK_3f955ae51b509a220c3097fae11" FOREIGN KEY ("deleted_by_id") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" DROP CONSTRAINT "FK_3f955ae51b509a220c3097fae11"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" DROP CONSTRAINT "FK_df6a54b12c322cc11e21f486a9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user-relation" DROP CONSTRAINT "FK_9c0f66b137fe12fea1999fd952d"`,
    );
    await queryRunner.query(`DROP TABLE "contact-book-user-relation"`);
    await queryRunner.query(`DROP TYPE "public"."contact-book-user-relation_type_enum"`);
    await queryRunner.query(`DROP TABLE "contact-book-user"`);
    await queryRunner.query(`DROP TYPE "public"."contact-book-user_type_enum"`);
  }
}
