import { config } from 'dotenv';
import { createHash } from 'crypto';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

config();

const encryptionKey = createHash('sha256')
  .update(process.env.JWT_SECRET || 'default-key-change-me')
  .digest('hex')
  .slice(0, 64);

@Entity()
export class SmtpSettings extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public host!: string;

  @Column({ default: 587 })
  public port!: number;

  @Column({ default: false })
  public secure!: boolean;

  @Column()
  public user!: string;

  @Column({
    type: 'varchar',
    transformer: new EncryptionTransformer({
      key: encryptionKey,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  public pass!: string;

  @Column({ nullable: true, default: null })
  public fromName?: string;

  @Column({ nullable: true, default: null })
  public fromEmail?: string;
}
