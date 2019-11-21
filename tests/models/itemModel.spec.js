const db = require('../../src/db/db-config.js');
const Items = require('../../src/models/item-model');
const data = require('./item-test-data.js');


describe('items model', () => {
  beforeEach(async () => {
    await db('items').truncate();
  });


  describe('add item function', () => {
    it('adds an item(story, comment etc) into the db', async () => {
      let allItems;
      allItems = await db('items');
      expect(allItems).toHaveLength(0);
      await Items.add(data.story);
      allItems = await db('items');
      expect(allItems).toHaveLength(1);
    });

    it('adds the provided item into the db', async () => {
      const story = await Items.add(data.story);
      expect(story.type).toBe(data.story.type);
      expect(story.title).toBe(data.story.title);

      const comment = await Items.add(data.comment);
      expect(comment.type).toBe(data.comment.type);

      const job = await Items.add(data.job);
      expect(job.type).toBe(data.job.type);

      const ask = await Items.add(data.ask);
      expect(ask.type).toBe(data.ask.type);
    });
  });

  describe('getAll items function', () => {
    it('retrieves all items from the db', async () => {
      let allItems;
      allItems = await Items.getAll();
      expect(allItems).toHaveLength(0);
      expect(Array.isArray(allItems)).toBe(true);

      Items.add(data.story);
      Items.add(data.comment);
      Items.add(data.job);

      allItems = await Items.getAll();
      expect(allItems).toHaveLength(3);
      expect(Array.isArray(allItems)).toBe(true);
    });
  });

  describe('findBy filter function', () => {
    it('finds an item using a filter key', async () => {
      Items.add(data.story);
      Items.add(data.story);
      Items.add(data.comment);

      const storyItems = await Items.findBy({ type: 'story' });
      const commentItem = await Items.findBy({ type: 'comment' });
      const invalidItem = await Items.findBy({ type: 'city' });

      expect(storyItems).toHaveLength(2);
      expect(commentItem.title).toBe(data.comment.title);
      expect(invalidItem).toHaveLength(0);
      expect(Array.isArray(storyItems)).toBe(true);
      expect(Array.isArray(commentItem)).toBe(true);
    });
  });

  describe('findById function', () => {
    it('finds an item using the given id', async () => {
      const story = await Items.add(data.story);

      const foundStory = await Items.findById(story.id);
      expect(story).toEqual(foundStory);
    });
  });

  describe('remove function', () => {
    it('deletes an item from the db given the id', async () => {
      const story = await Items.add(data.story);
      expect(story.id).toBe(1);

      const addedStory = await Items.findById(story.id);
      expect(addedStory).toEqual(story);

      const id = await Items.remove(story.id);
      const removedStory = await Items.findById(story.id);

      expect(removedStory).toBeFalsy();
      expect(id).toBe(story.id);
    });
  });

  describe('update function', () => {
    it('updates an item from the db given the id', async () => {
      const comment = await Items.add(data.comment);

      expect(comment).toHaveProperty('by', 'norvig');

      const updatedComment = await Items.update({ by: 'mulongo' }, comment.id);

      expect(updatedComment).toBeTruthy();
    });
  });
});
