import multer from 'multer';
import path from 'path';

// Configurações do multer para armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Correto para salvar na pasta uploads
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`); 
    }
});

const upload = multer({ storage: storage });

export default upload;
