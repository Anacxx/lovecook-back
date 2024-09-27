import S3Storage from '../utils/S3Storage';

class UploadImagesService {
  async execute(file: Express.Multer.File): Promise<string> {
    const s3 = new S3Storage();
    const imageUrl = await s3.saveFile(file.originalname, file.buffer); 
    return imageUrl; 
  }
}

export default UploadImagesService;
