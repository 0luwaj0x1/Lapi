import supertest from 'supertest';
import { createServer } from '../config/express';

const app = createServer();

describe('GET /location', () => {
  it('should return a 200 for a valid postcode', async () => {
    const { statusCode } = await supertest(app).get(
      '/location?postcode=N1C4AG',
    );
    expect(statusCode).toBe(200);
  });
  it('should return a 404 for invalid postcode', async () => {
    const { statusCode } = await supertest(app).get(
      '/location?postcode=N1C4AG3849094',
    );
    expect(statusCode).toBe(404);
  });

  it('should return a 422 for if passcode is not sent as query parameter', async () => {
    const { statusCode } = await supertest(app).get('/location');
    expect(statusCode).toBe(422);
  });
});
