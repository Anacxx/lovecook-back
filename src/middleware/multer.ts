import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Diretório onde as imagens serão armazenadas
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`); // Nome do arquivo com timestamp
    }
});

// Configuração do multer
const upload = multer({ storage: storage });

export default upload;
