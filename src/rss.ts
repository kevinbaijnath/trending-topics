import Parser from 'rss-parser';

import { getProcessedWords } from './words';

const parser = new Parser();

export async function getRawTitlesFromFeed(feedUrl: string) {
  let titles: string[];
  try {
    const results = await parser.parseURL(feedUrl);
    titles =
      results.items
        ?.filter(a => a.contentSnippet)
        ?.map(item => item.title ?? '') ?? [];
  } catch {
    titles = [];
  }

  return titles;
}

export async function processedWordsFromFeed(feedUrl: string) {
  const rawTitles = await getRawTitlesFromFeed(feedUrl);

  const processedWords: string[] = [];
  rawTitles.forEach(title => {
    processedWords.push(...getProcessedWords(title));
  });

  return processedWords;
}
