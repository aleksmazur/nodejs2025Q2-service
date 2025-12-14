import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1735689600000 implements MigrationInterface {
  name = 'InitialMigration1735689600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      CREATE TABLE "artists" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" varchar(255) NOT NULL,
        "grammy" boolean NOT NULL DEFAULT false,
        CONSTRAINT "PK_artists" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "login" varchar(255) NOT NULL,
        "password" varchar(255) NOT NULL,
        "version" integer NOT NULL DEFAULT 1,
        "createdAt" bigint NOT NULL,
        "updatedAt" bigint NOT NULL,
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "albums" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" varchar(255) NOT NULL,
        "year" integer NOT NULL,
        "artistId" uuid,
        CONSTRAINT "PK_albums" PRIMARY KEY ("id"),
        CONSTRAINT "FK_albums_artistId" FOREIGN KEY ("artistId") 
          REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "tracks" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" varchar(255) NOT NULL,
        "artistId" uuid,
        "albumId" uuid,
        "duration" integer NOT NULL,
        CONSTRAINT "PK_tracks" PRIMARY KEY ("id"),
        CONSTRAINT "FK_tracks_artistId" FOREIGN KEY ("artistId") 
          REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION,
        CONSTRAINT "FK_tracks_albumId" FOREIGN KEY ("albumId") 
          REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "favorites" (
        "id" varchar(50) NOT NULL DEFAULT 'default',
        "artists" text NOT NULL DEFAULT '',
        "albums" text NOT NULL DEFAULT '',
        "tracks" text NOT NULL DEFAULT '',
        CONSTRAINT "PK_favorites" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_albums_artistId" ON "albums" ("artistId")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_tracks_artistId" ON "tracks" ("artistId")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_tracks_albumId" ON "tracks" ("albumId")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_tracks_albumId"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_tracks_artistId"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_albums_artistId"`);

    await queryRunner.query(`DROP TABLE IF EXISTS "favorites"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "tracks"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "albums"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "artists"`);
  }
}
