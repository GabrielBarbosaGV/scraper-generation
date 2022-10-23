import serverless from 'serverless-http';
import express from 'express';
import { description as descriptionFor } from './src/libs/description-generation/description/description-generation';
import { documentFromUrl } from './src/libs/description-generation/fetching/document-from-url';
import { partitionedDescription } from './src/libs/description-generation/description/description-partitions';
import { partitionsOf } from './src/libs/description-generation/description/description-generation';
import { defaultWithUrlAndTopicsOpts, withUrlAndTopics } from './src/libs/utils/default-response';
import { exponentialBackOffCompletions } from './src/libs/completion';
import { completer } from './src/libs/description-generation/ai/fetched-completion';

const app = express();

const optsWithName = (name: string) => ({ ...defaultWithUrlAndTopicsOpts, name });

app.post('/description-from-url', withUrlAndTopics(async ({ url, topics }) => {
  const document = await documentFromUrl(url);

  return descriptionFor({ document, topics });
}, optsWithName('description-from-url')));

app.post('/partitioned-descriptions-from-url', withUrlAndTopics(async ({ url, topics }) => {
  const document = await documentFromUrl(url);

  return partitionedDescription({ document, topics, partitioningWith: partitionsOf });
}, optsWithName('partitioned-descriptions-from-url')));

app.post('/completions-for', withUrlAndTopics(async ({ url, topics }) => {
  const document = await documentFromUrl(url);

  const descriptions = partitionedDescription({ document, topics, partitioningWith: partitionsOf });

  const completion = completer();

  return exponentialBackOffCompletions(descriptions, { completingWith: completion.for });
}, optsWithName('completions-for')));

module.exports.handler = serverless(app);