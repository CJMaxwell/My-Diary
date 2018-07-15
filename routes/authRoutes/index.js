import { Router } from 'express';
import AuthController from '../../controllers/AuthController';


const authRoutes = Router();

authRoutes.post('/users/register', AuthController.register);
authRoutes.post('/users/login', AuthController.login);

export default authRoutes;
