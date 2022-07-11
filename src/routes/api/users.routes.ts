import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
const users = Router();

users.post('/', controllers.create);
export default users;
