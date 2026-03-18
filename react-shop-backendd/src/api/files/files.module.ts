import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocalFile from './entities/local-file.entity';
import { MinioService } from './minio.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile])],
  controllers: [FilesController],
  providers: [FilesService, MinioService],
  exports: [FilesService],
})
export class FilesModule {}
