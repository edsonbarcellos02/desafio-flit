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

    async Update(params)
    {

        const data = await prisma.funcionario.updateMany({
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
            where:{
                Id: params.Id
            }
        });
                      
        return data.count;         
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
        const data = await prisma.funcionario.findMany({
            select: {
                Id: true,
                Nome: true,
                Email: true,
                CPF: true,
                Ativo : true,
                Contratacao: true,
                Logradouro: true,
                Bairro: true,
                Cidade: true,
                UF: true,
                CEP: true,
                Cadastro: true,
            }
        });
                
        return data;
        
    }
  
};

export default new Funcionario();


