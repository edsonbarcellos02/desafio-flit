import { prisma } from "../lib/prisma.js";
import { dayjs } from "../lib/dayjs.js";

class Funcionario {

    async Create(params)
    {
        const data = await prisma.funcionario.create({
            data: {              
                Nome: params.Nome, 
                Email: params.Email, 
                CPF: params.CPF, 
                Ativo: params.Ativo === true || params.Ativo === 'true', 
                Contratacao:  dayjs(params.Contratacao).toISOString(), 
                Logradouro: params.Logradouro, 
                Bairro: params.Bairro, 
                Cidade: params.Cidade, 
                UF: params.UF, 
                CEP: params.CEP
            },
        });
        
        return data.Id;    
    }
    
    async getByCPF(CPF){
              
        const data = await prisma.funcionario.findMany({
            where:{
                CPF: CPF                
            }
        });              

        return data[0];  
    
    }

    async GetList() {
        const data = await prisma.seller.findMany({
            select: {
                IdSeller: true,
                IdTeam: true,
                Name: true,
                Image: true,
                Update: true,
                Excluded: true,
                Register: true,
                Active: true,
                Team: {
                    select: {
                    Name: true,
                    },
                },
            },
            where:{
                Excluded: false,                           
            }
        });
                
        return data;
        
    }

  
};

export default new Funcionario();


