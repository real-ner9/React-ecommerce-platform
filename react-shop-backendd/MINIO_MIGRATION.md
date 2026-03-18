# MinIO Storage Migration

This document describes the migration from local filesystem storage to MinIO (S3-compatible object storage) for file uploads in the e-commerce backend.

## Overview

The backend now uses MinIO for storing all uploaded files (product images, slider images, category images) instead of the local filesystem. This provides better scalability, reliability, and makes the application container-friendly.

## Changes Made

### 1. Dependencies Added
- `@aws-sdk/client-s3` - AWS SDK v3 S3 client (compatible with MinIO)

### 2. New Services
- `MinioService` (`src/api/files/minio.service.ts`) - Handles all MinIO/S3 operations
  - Auto-creates bucket on startup if it doesn't exist
  - Provides upload, download, and delete operations
  - Configures CORS policy for frontend access

### 3. Updated Components

#### FilesService (`src/api/files/files.service.ts`)
- `create()` now accepts a `folder` parameter to organize files in MinIO buckets
- Files are uploaded to MinIO with buffer from memory storage
- S3 key is stored in the `path` field of LocalFile entity
- `remove()` deletes from MinIO instead of filesystem
- New `getFileStream()` method streams files from MinIO

#### LocalFilesInterceptor (`src/api/files/interceptors/local-files.interceptor.ts`)
- Changed from `diskStorage` to `memoryStorage`
- Files are buffered in memory before upload to MinIO
- Added 10MB file size limit

#### FilesController (`src/api/files/files.controller.ts`)
- `GET /files/:id` now streams from MinIO instead of filesystem

#### Controllers Using File Uploads
- `ProductsController` - Uses folder `products-images`
- `SliderController` - Uses folder `slider-images`
- `CategoriesController` - Uses folder `categories-images`

### 4. Configuration Changes

#### Environment Variables (`.env`)
Old:
```env
UPLOADS_DIR=./uploads
```

New:
```env
MINIO_ENDPOINT=http://aidoll-minio-jtw20z:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin123
MINIO_BUCKET=ecommerce
MINIO_USE_SSL=false
```

#### Validation Schema (`src/config/env.validation.ts`)
- Removed `UPLOADS_DIR`
- Added `MINIO_ENDPOINT` (required)
- Added `MINIO_ACCESS_KEY` (required)
- Added `MINIO_SECRET_KEY` (required)
- Added `MINIO_BUCKET` (optional, defaults to 'ecommerce')
- Added `MINIO_USE_SSL` (optional, defaults to false)

## File Organization in MinIO

Files are organized in the bucket by folder:
- `products-images/` - Product images
- `slider-images/` - Homepage slider images
- `categories-images/` - Category images

Each file is stored with a UUID filename to prevent collisions.

## Database Schema

No changes to the `LocalFile` entity schema. The `path` field now stores the S3 key (e.g., `products-images/uuid.jpg`) instead of a filesystem path.

## API Contract

No changes to the API endpoints. The frontend continues to:
- Upload files to the same endpoints
- Receive file IDs in response
- Access files via `GET /api/files/:id`
- Delete files via `DELETE /api/files/:id`

## Bucket Initialization

The `MinioService` automatically:
1. Checks if the configured bucket exists on module initialization
2. Creates the bucket if it doesn't exist
3. Sets up CORS policy to allow GET and HEAD requests from any origin

## Migration Steps

### For Development

1. Update `.env` file with MinIO credentials:
```env
MINIO_ENDPOINT=http://aidoll-minio-jtw20z:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin123
MINIO_BUCKET=ecommerce
MINIO_USE_SSL=false
```

2. Start MinIO server (if running locally)

3. Restart the backend application

4. The bucket will be created automatically on first startup

### For Production

1. Set up MinIO server or S3-compatible storage
2. Configure environment variables with production credentials
3. Set `MINIO_USE_SSL=true` for HTTPS endpoints
4. Deploy the updated backend
5. Existing file references in the database will need to be migrated if you want to preserve old files (see Migration of Existing Files section)

## Migration of Existing Files

If you have existing files stored on the filesystem that need to be preserved:

1. The old files remain in the local `uploads/` directory
2. New uploads go to MinIO
3. To migrate existing files, you would need to:
   - Upload each file to MinIO
   - Update the `path` field in the database with the new S3 key
   - Keep old files as backup until migration is verified

A migration script is recommended for production environments with existing data.

## Troubleshooting

### Connection Errors
- Verify MinIO endpoint is accessible
- Check credentials (access key and secret key)
- Ensure MinIO server is running

### Bucket Creation Fails
- Verify the access key has permissions to create buckets
- Check MinIO server logs
- Try creating the bucket manually via MinIO Console

### File Upload Fails
- Check memory limits (current limit is 10MB per file)
- Verify MinIO has sufficient storage space
- Check MinIO server logs for errors

### File Download Fails
- Verify the file exists in MinIO
- Check the S3 key stored in database matches the actual file in MinIO
- Verify CORS policy allows access from your frontend domain

## Benefits

1. **Scalability** - MinIO can handle large volumes of files and concurrent requests
2. **Containerization** - No need for persistent volumes for file storage
3. **Reliability** - MinIO provides data durability and replication options
4. **Compatibility** - S3 API compatibility allows easy migration to AWS S3 if needed
5. **Management** - MinIO provides web console for file management
