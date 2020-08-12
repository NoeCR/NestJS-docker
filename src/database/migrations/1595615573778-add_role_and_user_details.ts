import {MigrationInterface, QueryRunner} from "typeorm";

export class addRoleAndUserDetails1595615573778 implements MigrationInterface {
    name = 'addRoleAndUserDetails1595615573778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_details" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_details" ADD "password" character varying NOT NULL`);
    }

}
