import serverless from 'serverless-http';
import express from 'express';
import { description as descriptionFor } from './src/libs/description-generation/description/description-generation';
import { documentFromUrl } from './src/libs/description-generation/fetching/document-from-url';
import { partitionedDescription } from './src/libs/description-generation/description/description-partitions';
import { partitionsOf } from './src/libs/description-generation/description/description-generation';
import { withUrlAndTopics } from './src/libs/utils/default-response';
import { completionsForAllDescriptions } from './src/libs/completion';
import { completer } from './src/libs/description-generation/ai/fetched-completion';

const app = express();

app.post('/description-from-url', withUrlAndTopics(async ({ url, topics }) => {
  const document = await documentFromUrl(url);

  return descriptionFor({ document, topics });
}));

app.post('/partitioned-descriptions-from-url', withUrlAndTopics(async ({ url, topics }) => {
  const document = await documentFromUrl(url);

  return partitionedDescription({ document, topics, partitioningWith: partitionsOf });
}));

app.post('/completions-for', withUrlAndTopics(async ({ url, topics }) => {
  const document = await documentFromUrl(url);

  const descriptions = partitionedDescription({ document, topics, partitioningWith: partitionsOf });

  const completion = completer();

  return completionsForAllDescriptions(descriptions, { completingWith: completion.for });
}));

module.exports.handler = serverless(app);