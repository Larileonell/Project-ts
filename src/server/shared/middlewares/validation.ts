import { RequestHandler } from "express"
import { ObjectSchema, ValidationError } from "yup";
import { Schema } from "yup";
import { StatusCodes } from "http-status-codes";

type TValidation = (field: 'body' | 'header' | 'params' | 'query',scheme: ObjectSchema<any>) => RequestHandler;
export const Validation: TValidation = (field, scheme)=> async (req, res, next)=>{
    console.log("teste")
    try {
        await scheme.validate(req[field], {abortEarly: false})
        return next();
    } catch (error) {
        const yupError = error as ValidationError;
        const errors: Record<string, string> ={};
        yupError.inner.forEach(error =>{
            if (error.path === undefined) return;
            errors[error.path] = error.message;
        })
    }
       res.status(StatusCodes.BAD_REQUEST).json({ erros: ValidationError, })
   }
  
