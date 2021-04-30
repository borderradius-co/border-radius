import {MigrationInterface, QueryRunner} from "typeorm";

export class Sabz1619749045350 implements MigrationInterface {
    name = 'Sabz1619749045350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "updoot" ("value" integer NOT NULL, "userId" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_68c2256e170545970f77311358c" PRIMARY KEY ("userId", "projectId"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "creatorId" integer NOT NULL, "name" character varying NOT NULL, "text" character varying NOT NULL, "points" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_comment" ("projectId" integer NOT NULL, "commentId" integer NOT NULL, CONSTRAINT "PK_6450dbe0d0802c48df3da5812fc" PRIMARY KEY ("projectId", "commentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ae5e74e5b3b22980720060c1a4" ON "project_comment" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_478d5bfad37046a941ee974531" ON "project_comment" ("commentId") `);
        await queryRunner.query(`CREATE TABLE "book_comment" ("bookId" integer NOT NULL, "commentId" integer NOT NULL, CONSTRAINT "PK_065411d82d67943a7efa0770341" PRIMARY KEY ("bookId", "commentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_11d89d7923a39536ee612ccdc1" ON "book_comment" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7389eec3b1a8699064df78b46a" ON "book_comment" ("commentId") `);
        await queryRunner.query(`ALTER TABLE "updoot" ADD CONSTRAINT "FK_9df9e319a273ad45ce509cf2f68" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "updoot" ADD CONSTRAINT "FK_2edae2e089628ba495c8dcc7f17" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_cfb02dac45e9dec5b82f960b3e3" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_comment" ADD CONSTRAINT "FK_ae5e74e5b3b22980720060c1a41" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_comment" ADD CONSTRAINT "FK_478d5bfad37046a941ee9745314" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_comment" ADD CONSTRAINT "FK_11d89d7923a39536ee612ccdc12" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_comment" ADD CONSTRAINT "FK_7389eec3b1a8699064df78b46a3" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_comment" DROP CONSTRAINT "FK_7389eec3b1a8699064df78b46a3"`);
        await queryRunner.query(`ALTER TABLE "book_comment" DROP CONSTRAINT "FK_11d89d7923a39536ee612ccdc12"`);
        await queryRunner.query(`ALTER TABLE "project_comment" DROP CONSTRAINT "FK_478d5bfad37046a941ee9745314"`);
        await queryRunner.query(`ALTER TABLE "project_comment" DROP CONSTRAINT "FK_ae5e74e5b3b22980720060c1a41"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_cfb02dac45e9dec5b82f960b3e3"`);
        await queryRunner.query(`ALTER TABLE "updoot" DROP CONSTRAINT "FK_2edae2e089628ba495c8dcc7f17"`);
        await queryRunner.query(`ALTER TABLE "updoot" DROP CONSTRAINT "FK_9df9e319a273ad45ce509cf2f68"`);
        await queryRunner.query(`DROP INDEX "IDX_7389eec3b1a8699064df78b46a"`);
        await queryRunner.query(`DROP INDEX "IDX_11d89d7923a39536ee612ccdc1"`);
        await queryRunner.query(`DROP TABLE "book_comment"`);
        await queryRunner.query(`DROP INDEX "IDX_478d5bfad37046a941ee974531"`);
        await queryRunner.query(`DROP INDEX "IDX_ae5e74e5b3b22980720060c1a4"`);
        await queryRunner.query(`DROP TABLE "project_comment"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "updoot"`);
    }

}
