import {MigrationInterface, QueryRunner} from "typeorm";

export class fixJoinTableRole1597693579717 implements MigrationInterface {
    name = 'fixJoinTableRole1597693579717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_roles" ("users" integer NOT NULL, "roles" integer NOT NULL, CONSTRAINT "PK_a55a42902fb0546c1ae311a97a3" PRIMARY KEY ("users", "roles"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b0765b277a8835ce2c424b34b6" ON "user_roles" ("users") `);
        await queryRunner.query(`CREATE INDEX "IDX_16fc23f663c1782c3661083f44" ON "user_roles" ("roles") `);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b0765b277a8835ce2c424b34b68" FOREIGN KEY ("users") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_16fc23f663c1782c3661083f444" FOREIGN KEY ("roles") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_16fc23f663c1782c3661083f444"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b0765b277a8835ce2c424b34b68"`);
        await queryRunner.query(`DROP INDEX "IDX_16fc23f663c1782c3661083f44"`);
        await queryRunner.query(`DROP INDEX "IDX_b0765b277a8835ce2c424b34b6"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
    }

}
