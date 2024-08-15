import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()
//dotenv é usada para carregar variáveis de ambiente de um arquivo chamado .env
//Usar variáveis de ambiente ajuda a manter essas informações sensíveis fora do código-fonte
//O método config() lê o arquivo .env no diretório raiz e carrega as variáveis definidas nele
//Cada linha no arquivo .env segue o formato NOME_DA_VARIAVEL=valor
//BCRYPT_COST é usada para definir o "custo" ou o número de "rounds" que o algoritmo de hash bcrypt usará para criar hashes seguros
//O módulo process é um objeto no Node.js que contém informações sobre o ambiente no qual o aplicativo está sendo executado, incluindo variáveis de ambiente.
//por isso é necessário colocar process antes de .env
export class HashManager {
//plaintext é a senha do usuário.
    public hash = async (plaintext: string): Promise<string> => {
        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const hash = await bcrypt.hash(plaintext, salt)

        return hash
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        return bcrypt.compare(plaintext, hash)
    }
}