import Joi from '@hapi/joi';

export const Login = (data)=>{

    const schema = Joi.object({ 
        Usuario: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.base": "O usuário deve ser um texto.",
            "string.empty": "O usuário é obrigatório.",
            "string.min": "O usuário deve ter pelo menos {#limit} caracteres.",
            "string.max": "O usuário deve ter no máximo {#limit} caracteres.",
            "string.alphanum": "O usuário só pode conter letras e números.",
            "any.required": "O campo usuário é obrigatório."
        }),

        Senha: Joi.string()
        .min(6)
        .max(30)
        .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+=-]{6,30}$"))
        .required()
        .messages({
            "string.empty": "A senha é obrigatória.",
            "string.min": "A senha deve ter pelo menos {#limit} caracteres.",
            "string.max": "A senha deve ter no máximo {#limit} caracteres.",
            "string.pattern.base": "A senha deve conter letras, números e pode incluir !@#$%^&*()_+=-",
            "any.required": "O campo senha é obrigatório."
        })
    });

    return schema.validate(data);
}

