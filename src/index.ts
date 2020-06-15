import Koa from 'koa';
import Router from 'koa-router';

import { processedWordsFromFeed } from './rss';
import { updateWordOccurence } from './words';

const app = new Koa();
const router = new Router();

const NUM_RESULTS = 5;

const FEED_URLS = [
  'http://rss.cnn.com/rss/cnn_topstories.rss',
  'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  'http://feeds.foxnews.com/foxnews/latest'
];

export function getTopKeys(
  mapping: { [key: string]: number },
  amount = NUM_RESULTS
) {
  const sortedEntries = Object.entries(mapping).sort((a, b) => b[1] - a[1]);
  const topKeys = sortedEntries.map(([topic, _]) => topic);

  return topKeys.slice(0, amount);
}

async function main() {
  router.get('/trending', async ctx => {
    const wordFrequency: { [key: string]: number } = {};

    const processedWordsForFeeds = await Promise.all(
      FEED_URLS.map(feedUrl => processedWordsFromFeed(feedUrl))
    );
    processedWordsForFeeds.forEach(processedWords =>
      updateWordOccurence(processedWords, wordFrequency)
    );

    ctx.body = {
      topics: getTopKeys(wordFrequency)
    };
  });

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(8888);
}

main();
