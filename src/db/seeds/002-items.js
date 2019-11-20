const COMMENT = {
  by: 'norvig',
  parent: 1,
  text: "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
  type: 'comment',
  user_id: 1,
};


const STORY = {
  by: 'dhouston',
  comment_count: 71,
	comments: [1,3,5],
  score: 111,
  title: 'My YC app: Dropbox - Throw away your USB drive',
  type: 'story',
  url: 'http://www.getdropbox.com/u/2/screencast.html',
  user_id: 1,
};

const ASK = {
  by: 'tel',
  comment_count: 16,
	comments: [1,2,3,4,5,6],
  score: 25,
  text: "<i>or</i> HN: the Next Iteration<p>I get the impression that with Arc being released a lot of people who never had time for HN before are suddenly dropping in more often. (PG: what are the numbers on this? I'm envisioning a spike.)<p>Not to say that isn't great, but I'm wary of Diggification. Between links comparing programming to sex and a flurry of gratuitous, ostentatious  adjectives in the headlines it's a bit concerning.<p>80% of the stuff that makes the front page is still pretty awesome, but what's in place to keep the signal/noise ratio high? Does the HN model still work as the community scales? What's in store for (++ HN)?",
  title: 'Ask HN: The Arc Effect',
  type: 'story',
  url: '',
  user_id: 2,
};

const JOB = {
  by: 'justin',
  score: 6,
  title: 'Justin.tv is looking for a Lead Flash Engineer!',
  type: 'job',
  url: '',
  user_id: 2,
  text: 'ustin.tv is the biggest live video site online. We serve hundreds of thousands of video streams a day, and have supported up to 50k live concurrent viewers',
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('items').truncate()
    .then(() => knex('items').insert([
      STORY,
      COMMENT,
      JOB,
      ASK,
      STORY,
      STORY,
      COMMENT,
    ]));
};
