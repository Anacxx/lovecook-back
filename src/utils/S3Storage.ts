import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'; // Importando do v3

import uploadConfig from '../config/upload';

class S3Storage {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: 'eu-north-1',
    });
  }

  async saveFile(filename: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.directory, filename);
    
    const ContentType = mime.contentType(path.extname(originalPath));

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.send(new PutObjectCommand({
      Bucket: 'lovecook1',
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    }));

    await fs.promises.unlink(originalPath);

    const url = `https://lovecook1.s3.eu-north-1.amazonaws.com/${filename}`;

    return url;
  }

  async deleteFile(filename: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({
      Bucket: 'lovecook1',
      Key: filename,
    }));
  }
}

export default S3Storage;
