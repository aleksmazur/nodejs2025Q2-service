import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('favorites')
export class Favorite {
  @PrimaryColumn({ type: 'varchar', length: 50, default: 'default' })
  id: string;

  @Column('simple-array', { default: [] })
  artists: string[];

  @Column('simple-array', { default: [] })
  albums: string[];

  @Column('simple-array', { default: [] })
  tracks: string[];
}

