# Trending topics from popular news sites

## Overview
This repository contains an app that will calculate the trending topics from a fixed set of RSS feeds.  Currently the application uses the RSS feeds provided by CNN, NYTimes and Fox News.

## Built with
This app uses typescript and node.js (koa and koa-router for the server). AVA is used as the test runner.

## How to run the application
1. Clone the repository
2. Navigate to the directory and run `npm install` (requires node.js)
3. Run the command `npm run build`
4. Run the command `node build/main/index.js`

The application will run on port `8888`.  The application can then be utilized by visiting `http://localhost:8888/trending`.

Tests can be run using `npm run test`.  Linting issues can be resolved by running `npm run fix`.

## Methodology

1. All of the titles from the RSS feeds are gathered in parallel.
2. These titles are then split by word and are filtered.  The filtering process removes non alphanumeric characters, normalizes the casing of the word to lower case and removes the word if it is a stopword.
3. All of the words which remain are then aggregated together based on occurrence.
4. The occurrence mapping is then sorted based on value (in descending order) and then the top N (currently set to 5) topics are returned to the client.

## Current issues

Note: Only a few of the issues are discussed below

### Names are not captured correctly
Example: Maria Ressa would be marked as ['maria','ressa'] instead of ['maria ressa']

Because the titles are being split by spaces, names are also split up.  This could be resolved by maintaining a dictionary of all possible words, and doing a lookup on the word to determine if it is a valid.

### Word cases are not considered
Example: The sentences `Protestors were running` and `A protestor was found` would have 'protestors' and 'protestor' in the occurence mapping.  Ideally, this would be fixed by using stemming/lemmatization which would normalize the word into `protestor`.

### Historical data is not considered (only the current point in time)

Currently the trends are calculated for the current point in time.  Ideally the occurence mapping would be calculated periodically and then stored.  Then, when trying to determine the current trend, the current occurence mapping (at the current point in time) can be compared to historical points.  From there, topics that only show up in the new occurrence, or topics whose occurrence values have increased would be considered as trending.

## Extra info
Instragram has a [post](https://instagram-engineering.com/trending-on-instagram-b749450e6d93) on how they did something similar.  Their methodology which takes into account (popularity, novelty and timeliness) makes a lot of sense but would also require a lot more work to do.
