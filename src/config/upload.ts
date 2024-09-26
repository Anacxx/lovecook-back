import multer from 'multer'; // Importa o multer para lidar com upload de arquivos.
import path from 'path'; // Importa utilitários para manipular caminhos de arquivos.
import crypto from 'crypto'; // Importa o módulo crypto para gerar strings aleatórias.

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // Define o diretório temporário para armazenar os arquivos enviados.

export default {
  directory: tmpFolder, // Exporta o diretório temporário.
  storage: multer.diskStorage({ // Configura o multer para usar o armazenamento no disco.
    destination: tmpFolder, // Define a pasta temporária como destino dos arquivos enviados.
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex'); // Gera um hash aleatório para o nome do arquivo.
      const filename = `${fileHash}-${file.originalname}`; // Cria o nome final do arquivo concatenando o hash com o nome original.

      return callback(null, filename); // Retorna o nome do arquivo via callback.
    },
  }),
};
