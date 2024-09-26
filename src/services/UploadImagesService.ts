import S3Storage from '../utils/S3Storage'; // Importa a classe de armazenamento S3.

class UploadImagesService {
  async execute(file: Express.Multer.File): Promise<void> {
    const s3 = new S3Storage(); // Cria uma instância do S3Storage.

    await s3.saveFile(file.filename); // Chama o método `saveFile` para fazer o upload do arquivo para o S3.
  }
}

export default UploadImagesService; // Exporta a classe para uso em outros arquivos.
