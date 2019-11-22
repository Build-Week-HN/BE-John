const supertest = require('supertest');
const server = require('../../../src/api/server.js');
const generateToken = require('../../../src/utils');
const Users = require('../../../src/models/user-model');
const db = require('../../../src/db/db-config.js');
const data = require('../../test-data.js');

const request = supertest(server);

const validToken = generateToken(data.validUser);

beforeAll(async () => {
  await db('users').truncate();
  await db('items').truncate();
  await Users.add({ username: 'test', password: 'test-pass' });
});

describe('stories API endpoint', () => {
  describe('get all stories', () => {
    it('should return an OK response code ', async () => {
      const expectedStatusCode = 200;

      const response = await request.get('/api/stories');

      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return JSON object with a list of all stories', async () => {
      const expectedBody = { status: 200, data: [] };

      const response = await request.get('/api/stories');

      expect(response.body).toEqual(expectedBody);
    });
  });


  describe('Add a story', () => {
    it('should return a bad request response if no token provided ', async () => {
      const response = await request.post('/api/stories');

      // Bad request no token
      expect(response.status).toBe(400);
    });

    it('should return unauthorized response if token is not valid', async () => {
      const response = await request.post('/api/stories')
        .set('Authorization', 'my name is john');

      expect(response.status).toBe(401);
    });

    it('should retun an unprocessable entity response when token is valid but data poorly formatted', async () => {
      const response = await request.post('/api/stories').set('Authorization', `${validToken}`);

      expect(response.status).toBe(422);
    });

    it('should add a story when a valid token is provided', async () => {
      const response = await request.post('/api/stories')
        .set('Authorization', `${validToken}`)
        .send(data.addStory);

      expect(response.status).toBe(201);
    });
  });
});
