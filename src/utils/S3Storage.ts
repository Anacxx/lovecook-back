import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';
import dotenv from 'dotenv';

dotenv.config();

class S3Storage {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION, 
    });
  }

  async saveFile(filename: string, fileContent: Buffer): Promise<string> {
    const ContentType = mime.contentType(filename);

    if (!ContentType) {
      throw new Error('File type not found');
    }

    await this.client.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME, 
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    }));

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`; // Usando as variáveis de ambiente
    return url;
  }

  async deleteFile(filename: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
    }));
  }
}

export default S3Storage;
