import { Request, Response } from "express"
import { getStatusCode, StatusCodes } from "http-status-codes"
import * as yup from 'yup'

interface ICidade {
    nome: string

}
const bodyvalidation: yup.Schema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3)
})
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    let validatedData: ICidade | undefined = undefined;
    try {
        validatedData = await bodyvalidation.validate(req.body, { abortEarly: false});

    } catch (error) {
        const yupError = error as yup.ValidationError;
        const ValidationErrors: Record<string, string> ={}


        yupError.inner.forEach(error =>{
          
           if (!error.path)  return;

            ValidationErrors[error.path] = error.message;
        })
        res.status(StatusCodes.BAD_REQUEST).json({erros: ValidationErrors, })
    }


}