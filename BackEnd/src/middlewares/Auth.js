import JWT from 'jsonwebtoken';

export const Auth = (req, res, next)=>
{
    const token = req.header("Authorization");
    
    if(!token) 
        return res.status(401).send("Acesso Negado!");

    try
    {
        const tokenValidate = JWT.verify(token, process.env.TOKEN_SECRET);
        req.user = tokenValidate;
        next();
    }
    catch
    {
        res.status(401).send("Acesso Negado!");
    }
}