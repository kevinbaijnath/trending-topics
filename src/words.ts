import { stopwords } from './stopwords';

export function getProcessedWords(title: string) {
  return title
    .split(' ')
    .map(word => processWord(word))
    .filter(word => !stopwords.has(word));
}

export function processWord(word: string) {
  return word
    .toLowerCase()
    .split('')
    .filter(char => char.match(/[a-z]/i))
    .join('');
}

export function updateWordOccurence(
  words: string[],
  occurence: { [key: string]: number }
) {
  words.forEach(word => {
    if (occurence.hasOwnProperty(word)) {
      occurence[word] += 1;
    } else {
      occurence[word] = 1;
    }
  });
}
