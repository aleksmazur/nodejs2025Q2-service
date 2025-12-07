import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  login: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @VersionColumn()
  version: number;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint' })
  updatedAt: number;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = Date.now();
  }
}

