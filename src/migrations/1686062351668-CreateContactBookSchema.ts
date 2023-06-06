import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactBookSchema1686062351668 implements MigrationInterface {
  name = 'CreateContactBookSchema1686062351668';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."contact-book-question-group_type_enum" AS ENUM('BABE', 'ELDER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact-book-question-group" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "display_order" integer NOT NULL, "type" "public"."contact-book-question-group_type_enum" NOT NULL, CONSTRAINT "PK_5d1587d25ee9ff851719f66c673" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact-book-question" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "display_order" integer NOT NULL, "display_prefix" character varying, "display_suffix" character varying, "type" character varying NOT NULL, "default_options" json, "contact_book_question_group_id" integer, CONSTRAINT "PK_b64aa4aba677fcce2042d505380" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact-book-option" ("id" SERIAL NOT NULL, "option" text NOT NULL, "contact_book_question_id" integer, "contact_book_user_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_8146b9b21eaa683bb9a9dfa9250" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact-book-file" ("id" SERIAL NOT NULL, "contact_book_id" integer, "file_path" character varying, "note" text, "extension" character varying, "original_file_size" integer, "compressed_file_size" integer, "is_uploaded" boolean NOT NULL DEFAULT false, "created_by_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_cf04b33705462613e40a8a14409" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact-book" ("id" SERIAL NOT NULL, "date" date NOT NULL, "contact_book_user_id" integer, CONSTRAINT "PK_1f917b46cc011637f04428f03e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact-book-record" ("id" SERIAL NOT NULL, "contact_book_id" integer, "contact_book_question_id" integer, "answer" text NOT NULL, "created_by_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_154f9631128221e24ecedb99928" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "contact-book-user" ADD "avatar" character varying`);
    await queryRunner.query(`ALTER TABLE "contact-book-user" ADD "owner_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "contact-book-question" ADD CONSTRAINT "FK_e3faca9689bd17f887f826e6bbd" FOREIGN KEY ("contact_book_question_group_id") REFERENCES "contact-book-question-group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-option" ADD CONSTRAINT "FK_7569d80e72c6dbbdf1a59e576aa" FOREIGN KEY ("contact_book_question_id") REFERENCES "contact-book-question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-option" ADD CONSTRAINT "FK_f8bd8930718b64fc60af5133dfb" FOREIGN KEY ("contact_book_user_id") REFERENCES "contact-book-user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user" ADD CONSTRAINT "FK_205269a49f1ae711ce385e637a2" FOREIGN KEY ("owner_id") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-file" ADD CONSTRAINT "FK_134cd126ea3cb0f245852522911" FOREIGN KEY ("contact_book_id") REFERENCES "contact-book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-file" ADD CONSTRAINT "FK_0d29ae45ee3cb72f28c4bcd48be" FOREIGN KEY ("created_by_id") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book" ADD CONSTRAINT "FK_4f1ff784c1e9211ed596a8ddccd" FOREIGN KEY ("contact_book_user_id") REFERENCES "contact-book-user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-record" ADD CONSTRAINT "FK_2df4e585427a636c869099c29e6" FOREIGN KEY ("contact_book_id") REFERENCES "contact-book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-record" ADD CONSTRAINT "FK_025378cb91a4bee80a57a78ce82" FOREIGN KEY ("contact_book_question_id") REFERENCES "contact-book-question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-record" ADD CONSTRAINT "FK_105de8dc59522286b27ff26046f" FOREIGN KEY ("created_by_id") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact-book-record" DROP CONSTRAINT "FK_105de8dc59522286b27ff26046f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-record" DROP CONSTRAINT "FK_025378cb91a4bee80a57a78ce82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-record" DROP CONSTRAINT "FK_2df4e585427a636c869099c29e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book" DROP CONSTRAINT "FK_4f1ff784c1e9211ed596a8ddccd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-file" DROP CONSTRAINT "FK_0d29ae45ee3cb72f28c4bcd48be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-file" DROP CONSTRAINT "FK_134cd126ea3cb0f245852522911"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-user" DROP CONSTRAINT "FK_205269a49f1ae711ce385e637a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-option" DROP CONSTRAINT "FK_f8bd8930718b64fc60af5133dfb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-option" DROP CONSTRAINT "FK_7569d80e72c6dbbdf1a59e576aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-book-question" DROP CONSTRAINT "FK_e3faca9689bd17f887f826e6bbd"`,
    );
    await queryRunner.query(`ALTER TABLE "contact-book-user" DROP COLUMN "owner_id"`);
    await queryRunner.query(`ALTER TABLE "contact-book-user" DROP COLUMN "avatar"`);
    await queryRunner.query(`DROP TABLE "contact-book-record"`);
    await queryRunner.query(`DROP TABLE "contact-book"`);
    await queryRunner.query(`DROP TABLE "contact-book-file"`);
    await queryRunner.query(`DROP TABLE "contact-book-option"`);
    await queryRunner.query(`DROP TABLE "contact-book-question"`);
    await queryRunner.query(`DROP TABLE "contact-book-question-group"`);
    await queryRunner.query(`DROP TYPE "public"."contact-book-question-group_type_enum"`);
  }
}
