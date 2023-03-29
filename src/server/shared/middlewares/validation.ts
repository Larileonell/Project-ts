import { RequestHandler } from "express"
import { object, ObjectSchema, ValidationError } from "yup";
import { Schema } from "yup";
import { StatusCodes } from "http-status-codes";


type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T>(schema: ObjectSchema<T>) => ObjectSchema<T>

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

const errorsResult: Record<string, Record<string, string>> = {};
 
export const Validation: TValidation = (getAllSchemas)=> async (req, res, next)=>{
 const schemas = getAllSchemas(Schema => Schema);
    Object.entries(schemas).forEach(([key, schema])=>{
    try {
        schema.validateSync(req[key as TProperty])
      } catch (error) {
          const yupError = error as ValidationError;
          const errors: Record<string, string> ={};
          yupError.inner.forEach(error =>{
              if (error.path === undefined) return;
              errors[error.path] = error.message;
          })
          errorsResult[key as TProperty] =errors
      }
      
 });
    if(Object.entries(errorsResult).length ===0 ){
        return next();

    }
    else{
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult})
    }
      
   }
  
