import { Request, RequestHandler, Response } from "express"
import { getStatusCode, StatusCodes } from "http-status-codes"
import * as yup from 'yup';


interface ICidade {
    nome: string;
    estado: string;
}
const bodyvalidation: yup.ObjectSchema<ICidade>= yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
})
export const createBodyValidation: RequestHandler = async (req, res, next) => {
    try {
         await bodyvalidation.validate(req.body, { abortEarly: false });
        return next();
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const ValidationErrors: Record<string, string> = {}


        yupError.inner.forEach(error => {

            if (error.path === undefined) return;

            ValidationErrors[error.path] = error.message;
        })
        res.status(StatusCodes.BAD_REQUEST).json({ erros: ValidationErrors, })
    }


}
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);
  
  
    return res.send('Create!');
  };
  