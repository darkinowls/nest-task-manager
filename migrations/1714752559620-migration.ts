import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1714752559620 implements MigrationInterface {
    name = 'Migration1714752559620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatarImage" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarImage"`);
    }

}
