import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGroupUidToContactBookRecordSchema1686147940240 implements MigrationInterface {
  name = 'AddGroupUidToContactBookRecordSchema1686147940240';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact-book-record" ADD "group_uid" smallint DEFAULT '0'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "contact-book-record"."group_uid" IS 'UID from the same question group'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "contact-book-record"."group_uid" IS 'UID from the same question group'`,
    );
    await queryRunner.query(`ALTER TABLE "contact-book-record" DROP COLUMN "group_uid"`);
  }
}
