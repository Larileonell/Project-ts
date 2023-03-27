import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
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
        validatedData = await bodyvalidation.validate(req.body);

    } catch (error) {
        const yupError = error as yup.ValidationError;

        res.status(500).json({
            erros: {
                default: yupError.message,
            }
        })
    }


}