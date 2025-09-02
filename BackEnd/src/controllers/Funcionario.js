import fs from 'fs';
import path from 'path';
import funcionario from '../models/Funcionario.js';
import { create} from '../validators/funcionario.js';

class Funcionario{

    async Create(req, res)
    {
        const { Nome, Email, CPF, Ativo, Contratacao, Logradouro, Bairro, Cidade, UF, CEP} = req.body;  
        const {error} = create(req.body);    

        if(error)
            return res.status(400).send(error.message);
        
        const person = await funcionario.getByCPF(CPF);
        
        if (person) 
            return res.status(409).send("Já existe um cadastro com este CPF.");
        
        const Id = await funcionario.Create({ Nome, Email, CPF, Ativo, Contratacao, Logradouro, Bairro, Cidade, UF, CEP });
                
        if (!Id) 
            return res.status(500).send("Falha ao realizar cadastro!");
        
        if(req.file) {
            const ext = path.extname(req.file.originalname);
            const newName = `uploads/${Id}${ext}`;
            fs.renameSync(req.file.path, newName);
        }
        
        res.status(201).send("Cadastro realizado com sucesso!"); 
                                           
    }  

    async GetList(req, res)
    {

         try {
            const funcionarios = await funcionario.GetList();

            const host = `${req.protocol}://${req.get('host')}`;

            const result = funcionarios.map(data => {                
                const uploadDir = 'uploads/';
                const files = fs.readdirSync(uploadDir);
                const imgFile = files.find(file => path.parse(file).name === data.id.toString());

                return {
                    ...data,
                    avatar: imgFile ? `${host}/uploads/${imgFile}` : null
                };
            });

            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).send("Erro ao listar funcionários");
        }                    
    }   
}

export default new Funcionario();
