import { Router } from "express";
import { StatusCodes } from 'http-status-codes';
import { cidadesControllers } from '../controllers'

const router = Router();

router.get('/', (req, res) => {
  return res.send('Olá, DEV!');
});



router.post('/cidades', cidadesControllers.createBodyValidation, cidadesControllers.create);


export { router }