import test from 'ava';

import { getTopKeys } from './index';

const getTopKeysCases: [
  string,
  { [key: string]: number },
  number,
  string[]
][] = [
  [
    'occurence with less than required keys',
    { cat: 500, dog: 10, animal: 600 },
    4,
    ['animal', 'cat', 'dog']
  ],
  [
    'occurence with exact amount of keys',
    { cat: 500, dog: 10, animal: 600 },
    3,
    ['animal', 'cat', 'dog']
  ],
  [
    'occurence with extra amount of keys',
    { cat: 500, dog: 10, animal: 600, zebra: 1000, bird: 50 },
    2,
    ['zebra', 'animal']
  ]
];
getTopKeysCases.forEach(([caseName, occurences, amount, expected]) => {
  test(`getTopKeys ${caseName}`, t => {
    t.deepEqual<string[]>(getTopKeys(occurences, amount), expected);
  });
});
