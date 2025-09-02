import { prisma } from "../lib/prisma.js";

class Usuario {
   
    async getByLogin(Usuario){
              
        const data = await prisma.usuario.findMany({
            where:{
                Usuario: Usuario                
            }
        });              

        return data[0];  
    
    }
  
};
export default new Usuario();


