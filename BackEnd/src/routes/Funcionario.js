import express from "express";
import Funcionario from "../controllers/Funcionario.js";
import { Auth } from "../middlewares/Auth.js";
import upload from '../middlewares/Upload.js';

const routes = express.Router();

routes.post("/funcionario", Auth, upload.single('Avatar'), Funcionario.Create);
routes.put("/funcionario", Auth, upload.single('Avatar'), Funcionario.Update);
routes.get("/funcionario", Auth, Funcionario.GetList);

export default routes;