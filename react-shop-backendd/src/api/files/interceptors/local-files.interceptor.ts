import { FilesInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';
import { BaseFileInterceptorOptions } from './types';

interface LocalFilesInterceptorOptions extends BaseFileInterceptorOptions {
  maxCount?: number;
}

function LocalFilesInterceptor(
  options: LocalFilesInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    filesInterceptor: NestInterceptor;
    constructor() {
      const multerOptions: MulterOptions = {
        storage: memoryStorage(),
        limits: {
          fileSize: 10 * 1024 * 1024, // 10MB limit
        },
      };

      this.filesInterceptor = new (FilesInterceptor(
        options.fieldName,
        options.maxCount || 10,
        multerOptions,
      ))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.filesInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export default LocalFilesInterceptor;
