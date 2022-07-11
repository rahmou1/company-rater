import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Testing Basic Endpont response', () => {
  it('Get The / EndPoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
