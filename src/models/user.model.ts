import db from '../database';
import User from '../types/user.type';

class UserModel {
  // Create New User
  async create(u: User): Promise<User> {
    try {
      //open Connection with DB
      const connection = await db.connect();
      const sql = `INSERT INTO users(first_name, last_name, user_name, email, working_company, password, profile_pic) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
      //run query
      const result = await connection.query(sql, [
        u.first_name,
        u.last_name,
        u.user_name,
        u.email,
        u.working_company,
        u.password,
        u.profile_pic,
      ]);
      //close connection
      connection.release();
      // return created user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create user (${u.user_name}): ${(error as Error).message}`
      );
    }
  }
  // Get All Users
  // Get Specific User
  // Update User
  // delete user
  //authenticate user
}

export default UserModel;
