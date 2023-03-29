import { RequestHandler } from "express"
import { ObjectSchema, ValidationError } from "yup";
import { Schema } from "yup";
import { StatusCodes } from "http-status-codes";

type TProrperty = 'body' | 'header' | 'params' | 'query'
type AllSchema = Record<TProrperty, ObjectSchema<any>>

type TValidation = (schemas: Partial<AllSchema>) => RequestHandler;

export const Validation: TValidation = (schemas)=> async (req, res, next)=>{
    console.log("passei aqui")
    /*try {
        await schemas.validate(req[schemas], {abortEarly: false})
        return next();
    } catch (error) {
        const yupError = error as ValidationError;
        const errors: Record<string, string> ={};
        yupError.inner.forEach(error =>{
            if (error.path === undefined) return;
            errors[error.path] = error.message;
        })
    }
       res.status(StatusCodes.BAD_REQUEST).json({ erros: ValidationError, })*/
   }
  
