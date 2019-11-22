const db = require('../../src/db/db-config.js');
const Items = require('../../src/models/item-model');
const data = require('../test-data.js');


describe('items model', () => {
  beforeEach(async () => {
    await db('items').truncate();
  });


  describe('add item function', () => {
    it('adds an item into the db', async () => {
      let allItems;
      allItems = await db('items');
      expect(allItems).toHaveLength(0);
      await Items.add(data.story);
      allItems = await db('items');
      expect(allItems).toHaveLength(1);
    });

    it('adds the provided item into the db', async () => {
      const [story] = await Items.add(data.story);
      expect(story.type).toBe(data.story.type);

      const [comment] = await Items.add(data.comment);
      expect(comment.type).toBe(data.comment.type);
    });
  });

  describe('getAll items function', () => {
    it('retrieves all items from the db', async () => {
      let allItems;
      allItems = await Items.getAll();
      expect(allItems).toHaveLength(0);

      await Items.add(data.story);
      await Items.add(data.comment);

      allItems = await Items.getAll();
      expect(allItems).toHaveLength(2);
    });
  });

  describe('findBy filter function', () => {
    it('finds an item using a filter key', async () => {
      await Items.add(data.story);
      await Items.add(data.comment);

      const storyItems = await Items.findBy({ type: 'story' });
      const commentItem = await Items.findBy({ type: 'comment' });
      const invalidItem = await Items.findBy({ type: 'city' });

      expect(storyItems).toHaveLength(1);
      expect(commentItem).toHaveLength(1);
      expect(invalidItem).toHaveLength(0);
    });
  });

  describe('findById function', () => {
    it('finds an item using the given id', async () => {
      const resp = await Items.add(data.story);
      const [story] = resp;

      const foundStory = await Items.findById(story.id);
      expect(story).toEqual(foundStory);
    });
  });

  describe('remove function', () => {
    it('deletes an item from the db given the id', async () => {
      const [story] = await Items.add(data.story);
      let storyItems = await Items.findBy({ type: 'story' });
      expect(storyItems).toHaveLength(1);

      await Items.remove(story.id);
      storyItems = await Items.findBy({ type: 'story' });
      expect(storyItems).toHaveLength(0);
    });
  });

  describe('update function', () => {
    it('updates an item from the db given the id', async () => {
      const [comment] = await Items.add(data.comment);

      expect(comment).toHaveProperty('by', 'norvig');

      const [updatedComment] = await Items.update({ by: 'mulongo' }, comment.id);

      expect(updatedComment).toHaveProperty('by', 'mulongo');
    });
  });
});
