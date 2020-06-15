// tslint:disable:no-expression-statement
import test from 'ava';
import { getProcessedWords, processWord, updateWordOccurence } from './words';
const updateWordOccurenceCases: [
  string,
  string[],
  { [key: string]: number },
  { [key: string]: number }
][] = [
  [
    'no words exist',
    ['these', 'are', 'some', 'words'],
    {},
    { these: 1, are: 1, some: 1, words: 1 }
  ],
  [
    'all words exist',
    ['these', 'are', 'some', 'words'],
    { these: 100, are: 200, some: 300, words: 400 },
    { these: 101, are: 201, some: 301, words: 401 }
  ],
  [
    'some words exist',
    ['some', 'words', 'exist', 'already'],
    { words: 1, exist: 2 },
    { some: 1, words: 2, exist: 3, already: 1 }
  ]
];
updateWordOccurenceCases.forEach(([caseName, words, occurence, expected]) => {
  test(`updateWordOccurence ${caseName}`, t => {
    updateWordOccurence(words, occurence);
    t.deepEqual<{ [key: string]: number }>(occurence, expected);
  });
});

const processWordCases: [string, string, string][] = [
  ['word with only lowercase valid characters', 'hippopotamus', 'hippopotamus'],
  ['mixed case valid word', 'UpperCaseWord', 'uppercaseword'],
  ['only invalid characters', '$48.!?()@#$%', ''],
  [
    'mixed case with some invalid characters',
    'EndOfSentence!.',
    'endofsentence'
  ]
];
processWordCases.forEach(([caseName, input, expected]) => {
  test(`processWord ${caseName}`, t => {
    t.deepEqual<string>(processWord(input), expected);
  });
});

const getProcessedWordCases: [string, string, string[]][] = [
  [
    'string with only valid words',
    'Striking portraits humanity',
    ['striking', 'portraits', 'humanity']
  ],
  ['string with only invalid words', "once out a and the it's can't won't", []],
  [
    'string with mixed case, punctuation and filtered words',
    "Comedians once called out racism in a joke. Now it's going viral.",
    ['comedians', 'called', 'racism', 'joke', 'viral']
  ]
];
getProcessedWordCases.forEach(([caseName, input, expected]) => {
  test(`getProcessedWord ${caseName}`, t => {
    t.deepEqual<string[]>(getProcessedWords(input), expected);
  });
});
