import express from 'express';
import { prisma } from '../lib/prisma.js';

import Autenticacao from "../routes/Autenticacao.js";
import Funcionario from "../routes/Funcionario.js";

const routes = (app)=>{    
    
    app.route("/").get(async (req, res) => {
        try {
            await prisma.$connect();
            res.status(200).send(`Conexão com o banco de dados bem-sucedida!`);
        } catch (error) {
            res.status(200).send(`Erro ao conectar ao banco de dados: ${error}`);
        } finally {
            await prisma.$disconnect();
        }
    });

    app.use(express.json(), 
        Autenticacao,
        Funcionario        
    );
};
export default routes;