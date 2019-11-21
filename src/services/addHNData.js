const Items = require('../models/item-model');
const db = require('../db/db-config.js');
const { getStoryIds, getStory, getComment } = require('./helpers');

async function addData() {
  // add stories and their associated comments

  try {
    const storyIds = await getStoryIds();

    storyIds.forEach(async (storyId) => {
      const [story, commentIds] = await getStory(storyId);
      let comments = commentIds && await commentIds.map((id) => getComment(id));
      comments = await Promise.all(comments);


      try {
      // Save data to the database
        await db('items').truncate();
        await Items.add(story);
        comments.forEach(async (comment) => {
          console.log(comment);
          if (comment && 'by' in comment && comment.by) {
            await Items.add(comment);
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    });
  } catch (err) {
    console.log('Error while trying to fetch and save stories and comments: ', err);
  }
}


module.exports = addData;
