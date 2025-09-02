import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { Login } from '../validators/usuario.js';
import usuario from '../models/Usuario.js';

class Autenticacao{

    async Login(req, res)
    {
        const {Usuario, Senha} = req.body;
        const {error} = Login(req.body);          
        if(error)
        {
            return res.status(400).send(error.message);
        }    
        
        const data = await usuario.getByLogin(Usuario);
        if(!data)
        {
            return res.status(400).send("Usuário ou senha inválidos!");
        }

        const result = await bcrypt.compare(Senha, data.Senha)
        if(!result)
        {
            return res.status(400).send("Credenciais inválidas!");
        }

        const token = JWT.sign({IdUsuario: data.IdUsuario}, process.env.TOKEN_SECRET);

        res.status(200);
        res.header("Authorization", token);
        res.json({ 
            access_token: token,
            user: {
                "IdUsuario": data.IdUsuario,                
                "Nome": data.Nome,                                
            }
        });
    }
   
}

export default new Autenticacao();



