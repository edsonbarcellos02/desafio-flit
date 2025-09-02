import Joi from '@hapi/joi';

export const create = (data)=>{

    const schema = Joi.object({ 
        Nome: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "O nome deve ser um texto.",
            "string.empty": "O nome é obrigatório.",
            "string.min": "O nome deve ter pelo menos {#limit} caracteres.",
            "string.max": "O nome deve ter no máximo {#limit} caracteres.",
            "any.required": "O campo nome é obrigatório."
        }),
        Email: Joi.string()
        .email({ tlds: { allow: true } })
        .required()
        .messages({
            "string.base": "O email deve ser um texto.",
            "string.empty": "O email é obrigatório.",
            "string.email": "Informe um email válido.",
            "any.required": "O campo email é obrigatório."
        }),
        CPF: Joi.string()
        .length(14)
        .required()
        .messages({
            "string.empty": "O CPF é obrigatório.",
            "string.length": "O CPF deve conter exatamente 14 dígitos.",
            "any.required": "O campo CPF é obrigatório."
        }),
        Ativo: Joi.boolean()
        .default(true)
        .messages({
            "boolean.base": "O campo Ativo deve ser verdadeiro ou falso."
        }),
        Contratacao: Joi.date()        
        .required()
        .messages({
            "date.base": "A data de contratação deve ser válida.",            
            "any.required": "O campo data de contratação é obrigatório."
        }),
        Logradouro: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.base": "O logradouro deve ser um texto.",
            "string.empty": "O logradouro é obrigatório.",
            "string.min": "O logradouro deve ter pelo menos {#limit} caracteres.",
            "string.max": "O logradouro deve ter no máximo {#limit} caracteres.",
            "any.required": "O campo logradouro é obrigatório."
        }),
        Bairro: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.base": "O bairro deve ser um texto.",
            "string.empty": "O bairro é obrigatório.",
            "string.min": "O bairro deve ter pelo menos {#limit} caracteres.",
            "string.max": "O bairro deve ter no máximo {#limit} caracteres.",
            "any.required": "O campo bairro é obrigatório."
        }),
        Cidade: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.base": "A cidade deve ser um texto.",
            "string.empty": "A cidade é obrigatória.",
            "string.min": "A cidade deve ter pelo menos {#limit} caracteres.",
            "string.max": "A cidade deve ter no máximo {#limit} caracteres.",
            "any.required": "O campo cidade é obrigatório."
        }),
        UF: Joi.string()
        .min(2)
        .max(50)
        .uppercase()
        .required()
        .messages({
            "string.base": "A UF deve ser um texto.",
            "string.empty": "A UF é obrigatória.",
            "string.min": "A cidade deve ter pelo menos {#limit} caracteres.",
            "string.max": "A cidade deve ter no máximo {#limit} caracteres.",
            "any.required": "O campo UF é obrigatório."
        }),
        CEP: Joi.string()
        .length(9)
        .required()
        .messages({
            "string.length": "O CEP deve conter exatamente 9 dígitos.",
        })            
    });

    return schema.validate(data);
}
  
  
  
  
  
  
  