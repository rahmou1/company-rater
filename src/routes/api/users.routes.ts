import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
const users = Router();

users.route('/').get(controllers.getMany).post(controllers.create);
users
  .route('/:id')
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.deleteOne);

// authentication
users.route('/authenticate').post(controllers.authenticate);

export default users;
