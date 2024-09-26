import S3Storage from '../utils/S3Storage'; // Importa a classe de armazenamento S3.

class DeleteImagesService {
  async execute(filename: string ): Promise<void> {
    const s3 = new S3Storage(); // Cria uma instância do S3Storage.

    await s3.deleteFile(filename); // Chama o método `deleteFile` para deletar o arquivo do S3.
  }
}

export default DeleteImagesService; // Exporta a classe para uso em outros arquivos.
