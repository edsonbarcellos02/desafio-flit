import fs from 'fs';
import funcionario from '../models/Funcionario.js';
import { create} from '../validators/funcionario.js';

class Funcionario{

    async Create(req, res)
    {
        const { Nome, Email, CPF, Ativo, Contratacao, Logradouro, Bairro, Cidade, UF, CEP} = req.body;  

       const fotoPath = req.file ? req.file.path : null;

        let Image = null;
        if (fotoPath) 
            Image = fs.readFileSync(fotoPath);
            

        const {error} = create(req.body);    
        if(error)
            return res.status(400).send(error.message);
        
        const person = await funcionario.getByCPF(CPF);
        
        if (person) 
            return res.status(409).send("Já existe um cadastro com este CPF.");
        
        const response = await funcionario.Create({ Nome, Email, CPF, Ativo, Contratacao, Logradouro, Bairro, Cidade, UF, CEP });
                
        if(response){
            res.status(201).send("Cadastrado realizado com sucesso!");
        }else {
            res.status(500).send("Falha ao realizar a operação!");
        } 
                                           
    }  

    async GetList(req, res)
    {
        const data = await Seller.GetList();
        
        if (data) {
            res.status(200).json({ message: 'success', data });
        } else {
            res.status(500).json({ message: 'Erro ao realizar consulta.' });
        } 
                    
    }   
}

export default new Funcionario();
