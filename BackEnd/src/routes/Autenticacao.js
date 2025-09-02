import express from "express";
import Autenticacao from "../controllers/Autenticacao.js";

const routes = express.Router();

routes.post("/login", Autenticacao.Login);

export default routes;