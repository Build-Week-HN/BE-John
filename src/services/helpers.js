const axios = require('axios');
const toDateTime = require('../utils/toDateTime');

const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const newStoriesUrl = `${baseUrl}topstories.json`;
const storyUrl = `${baseUrl}item/`;

const selectFields = ({
  id, by, url, time, title, type, score, descendants, parent, text,
} = {}) => ({
  id,
  by,
  url,
  created: toDateTime(time),
  title,
  type,
  score,
  comment_count: descendants,
  parent,
  text,
});

const getStory = async (storyId) => {
  let commentIds;
  const result = await axios.get(`${storyUrl + storyId}.json`)
    .then(({ data }) => {
      commentIds = data.kids;
      commentIds.splice(10);
      return data && selectFields(data);
    });
  return [result, commentIds];
};

const getStoryIds = async () => {
  const result = await axios.get(newStoriesUrl).then(({ data }) => data);
  result.splice(5);
  return result;
};


const getComment = async (commentId) => {
  const result = await axios.get(`${storyUrl + commentId}.json`)
    .then(({ data }) => data && selectFields(data));
  return result;
};

module.exports = {
  getStory,
  getStoryIds,
  getComment,
};
