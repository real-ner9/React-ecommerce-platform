import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  public pass!: string;

  @Column({ nullable: true, default: null })
  public fromName?: string;

  @Column({ nullable: true, default: null })
  public fromEmail?: string;
}
