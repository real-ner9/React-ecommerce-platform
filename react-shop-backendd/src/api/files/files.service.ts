import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import LocalFile from './entities/local-file.entity';
import { DeleteResult } from 'typeorm/browser';
import {
  CreateLocalFileDto,
  UpdateLocalFileDto,
} from './dto/local-file.dto';
import type { Express } from 'express';
import { MinioService } from './minio.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(LocalFile)
    private readonly repository: Repository<LocalFile>,
    private readonly minioService: MinioService,
  ) {}

  async findOne(id: number): Promise<LocalFile> {
    return this.repository.findOneByOrFail({ id });
  }

  async create(
    fileData: CreateLocalFileDto | Express.Multer.File,
    folder: string = 'uploads',
  ): Promise<LocalFile> {
    let dto: CreateLocalFileDto;

    if ('buffer' in fileData && Buffer.isBuffer(fileData.buffer)) {
      // This is Express.Multer.File with memory storage
      const { key, filename } = await this.minioService.uploadFile(
        fileData.buffer,
        fileData.mimetype,
        folder,
        fileData.originalname,
      );

      dto = {
        filename,
        path: key, // Store S3 key instead of filesystem path
        mimetype: fileData.mimetype,
      };
    } else {
      // This is CreateLocalFileDto (legacy support)
      dto = fileData as CreateLocalFileDto;
    }

    const newFile = this.repository.create(dto);
    return this.repository.save(newFile);
  }

  update(id: number, params: UpdateLocalFileDto): Promise<UpdateResult> {
    return this.repository.update({ id }, { ...params });
  }

  async remove(id: number): Promise<DeleteResult> {
    const file = await this.findOne(id);

    try {
      await this.minioService.deleteFile(file.path);
    } catch (error) {
      console.error(`Failed to delete file from MinIO: ${error.message}`);
    }

    return this.repository.delete({ id });
  }

  async getFileStream(id: number): Promise<{
    stream: any;
    file: LocalFile;
  }> {
    const file = await this.findOne(id);
    const stream = await this.minioService.getFileStream(file.path);
    return { stream, file };
  }
}
