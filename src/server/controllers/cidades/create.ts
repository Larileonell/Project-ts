import { query, Request, RequestHandler, Response } from "express"
import { getStatusCode, StatusCodes } from "http-status-codes"
import * as yup from 'yup';
import { Validation } from "../../shared/middlewares";



interface ICidade {
    nome: string;
    estado: string;
}
interface Ifilter {
    filter?: string;
}


export const CreatequeryValidation = Validation({
    body: yup.object().shape({
        nome: yup.string().required().min(3),
        estado: yup.string().required().min(3),
    }),
        query: yup.object().shape({
        filter: yup.string().required().min(3)
    })
});




export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);


    return res.send('Create!');
};


  