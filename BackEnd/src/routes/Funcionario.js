import multer from 'multer';
import express from "express";
import Funcionario from "../controllers/Funcionario.js";
import { Auth } from "../middlewares/Auth.js";

const upload = multer({ dest: 'uploads/' });
const routes = express.Router();

routes.post("/funcionario", Auth, upload.single('Image'), Funcionario.Create);
routes.get("/funcionario", Auth, Funcionario.GetList);

export default routes;