import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadBucketCommand,
  CreateBucketCommand,
  PutBucketCorsCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly logger = new Logger(MinioService.name);
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    const endpoint = this.configService.getOrThrow<string>('MINIO_ENDPOINT');
    const accessKey = this.configService.getOrThrow<string>('MINIO_ACCESS_KEY');
    const secretKey =
      this.configService.getOrThrow<string>('MINIO_SECRET_KEY');
    const useSsl = this.configService.get<boolean>('MINIO_USE_SSL', false);

    this.bucket = this.configService.get<string>('MINIO_BUCKET', 'ecommerce');

    this.s3Client = new S3Client({
      endpoint,
      region: 'us-east-1', // MinIO doesn't care about region, but SDK requires it
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      forcePathStyle: true, // Required for MinIO
      tls: useSsl,
    });
  }

  async onModuleInit() {
    await this.ensureBucketExists();
  }

  private async ensureBucketExists(): Promise<void> {
    try {
      await this.s3Client.send(new HeadBucketCommand({ Bucket: this.bucket }));
      this.logger.log(`Bucket "${this.bucket}" already exists`);
    } catch (error) {
      if (error.name === 'NotFound') {
        this.logger.log(`Creating bucket "${this.bucket}"...`);
        await this.s3Client.send(
          new CreateBucketCommand({ Bucket: this.bucket }),
        );

        // Set CORS policy to allow frontend access
        await this.s3Client.send(
          new PutBucketCorsCommand({
            Bucket: this.bucket,
            CORSConfiguration: {
              CORSRules: [
                {
                  AllowedHeaders: ['*'],
                  AllowedMethods: ['GET', 'HEAD'],
                  AllowedOrigins: ['*'],
                  ExposeHeaders: ['ETag'],
                },
              ],
            },
          }),
        );

        this.logger.log(`Bucket "${this.bucket}" created successfully`);
      } else {
        this.logger.error(`Failed to check/create bucket: ${error.message}`);
        throw error;
      }
    }
  }

  async uploadFile(
    buffer: Buffer,
    mimetype: string,
    folder: string,
    originalFilename?: string,
  ): Promise<{ key: string; filename: string }> {
    const extension = originalFilename?.split('.').pop() || 'bin';
    const filename = `${uuidv4()}.${extension}`;
    const key = `${folder}/${filename}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    });

    await this.s3Client.send(command);

    this.logger.log(`File uploaded: ${key}`);
    return { key, filename };
  }

  async getFileStream(key: string): Promise<any> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    // AWS SDK v3 returns a ReadableStream that needs to be converted to Node.js stream
    return response.Body;
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.s3Client.send(command);
    this.logger.log(`File deleted: ${key}`);
  }

  getBucket(): string {
    return this.bucket;
  }
}
