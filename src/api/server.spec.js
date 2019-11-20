const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
  describe('index route', () => {
    it('returns an OK response code on index route', async () => {
      const response = await request(server).get('/api');

      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
    });
  });
});
