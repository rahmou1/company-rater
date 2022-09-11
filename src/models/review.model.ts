import Review from '../types/review.type';
import db from '../database';

class ReviewModel {
  async create(r: Review): Promise<Review> {
    try {
      const connection = await db.connect();
      const sql =
        'INSERT INTO reviews (review, comment) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(sql, [r.review, r.comment]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create this review (${r.review}): ${
          (error as Error).message
        }`
      );
    }
  }
}
