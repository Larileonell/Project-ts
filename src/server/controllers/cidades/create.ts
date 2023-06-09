import {  Request,  Response } from "express"
import { getStatusCode, StatusCodes } from "http-status-codes"
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";



interface ICidade {
    nome: string;

}


export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
      nome: yup.string().required().min(3),
    })),
  }));
  
  export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);
  
  
    return res.send('Create!');
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('não implem')
  };


  