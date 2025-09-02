import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.js';

async function main() {
  
    const userExists = await prisma.usuario.findFirst({
        where: { Usuario: 'admin' }
    });

    if (!userExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);

        await prisma.usuario.create({
            data: {
                Nome: 'Administrador',
                Usuario: 'admin',
                Senha: hashedPassword,                
                Cadastro: new Date()
            }
        });
        
    }
}

main()
.catch(e => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});