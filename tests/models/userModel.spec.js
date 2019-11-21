const db = require('../../src/db/db-config');
const Users = require('../../src/models/user-model');

describe('users model', () => {
  beforeEach(async () => {
    await db('items').truncate();
    await db('users').truncate();
  });

  describe('add function', () => {
    it('adds users into the db', async () => {
      let allUsers = await db('users');
      expect(allUsers).toHaveLength(0);
      await Users.add({ username: 'nero', password: '1234abcd' });
      allUsers = await db('users');
      expect(allUsers).toHaveLength(1);
    });
  });


  describe('findBy function', () => {
    it('find users using a filter key', async () => {
      const user = await Users.findBy({ username: 'nero' });
      expect(user).toHaveLength(0);

      Users.add({ username: 'nero', password: '1234abcd' });
      const foundUser = await Users.findBy({ username: 'nero' });
      expect(foundUser).toHaveLength(1);
    });
  });
});
