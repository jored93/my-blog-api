import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({ description: 'Last Name' })
  @Column({ type: 'varchar', length: 100, unique: true, name: 'last_name' })
  lastName: string;

  @ApiProperty({ description: 'Avatar' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;
}
