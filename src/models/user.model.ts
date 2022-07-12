import bcrypt from 'bcrypt';
import db from '../database';
import User from '../types/user.type';
import config from '../config';

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class UserModel {
  // Create New User
  async create(u: User): Promise<User> {
    try {
      //open Connection with DB
      const connection = await db.connect();
      const sql = `INSERT INTO users(first_name, last_name, user_name, email, working_company, password, profile_pic) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) returning id, first_name, last_name, user_name, email, working_company, profile_pic`;
      //run query
      const result = await connection.query(sql, [
        u.first_name,
        u.last_name,
        u.user_name,
        u.email,
        u.working_company,
        hashPassword(u.password),
        u.profile_pic,
      ]);
      //close connection
      connection.release();
      // return created user
      return result.rows[0];
    } catch (error) {
      if ((error as Error).message.includes('users_user_name_key')) {
        (error as Error).message =
          'This username already exists before please select another username';
      } else if ((error as Error).message.includes('users_email_key')) {
        (error as Error).message =
          'This email already exists before please select another email';
      }
      throw new Error(
        `Unable to create user (${u.user_name}): ${(error as Error).message}`
      );
    }
  }
  // Get All Users
  async getMany(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql =
        'SELECT id, first_name, last_name, user_name, email, working_company, profile_pic from users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error at retrieving users ${(error as Error).message}`);
    }
  }
  // Get Specific User
  async getOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql =
        'SELECT id, first_name, last_name, user_name, email, working_company, profile_pic FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot find user ${id}, ${(error as Error).message}`);
    }
  }

  // Update User
  async updateOne(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE users
       SET first_name=$1, last_name=$2, user_name=$3, email=$4, working_company=$5, password=$6, profile_pic=$7 
       WHERE id=$8
        RETURNING id, first_name, last_name, user_name, email, working_company, profile_pic`;
      const result = await connection.query(sql, [
        u.first_name,
        u.last_name,
        u.user_name,
        u.email,
        u.working_company,
        hashPassword(u.password),
        u.profile_pic,
        u.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Cannot Update user ${u.user_name}, ${(error as Error).message}`
      );
    }
  }

  // delete user
  async deleteOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM users
       WHERE id=($1) RETURNING id, first_name, last_name, user_name, email, working_company, profile_pic`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Cannot delete this user ${id}, ${(error as Error).message}`
      );
    }
  }

  //authenticate user
}

export default UserModel;
