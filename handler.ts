import serverless from 'serverless-http';
import express from 'express';
import { description as descriptionFor } from './src/libs/description-generation/description/description-generation';
import { ResponseStatus } from './src/libs/constants';
import { documentFromUrl } from './src/libs/description-generation/fetching/document-from-url';
import { partitionedDescription } from './src/libs/description-generation/description/description-partitions';
import { partitionsOf } from './src/libs/description-generation/description/description-generation';
import { responding } from './src/libs/utils/default-response';

const app = express();

app.post('./description-from-url', responding(async req => {
  const { url, topics } = JSON.parse(req.body);

  const document = await documentFromUrl(url);

  return descriptionFor({ document, topics });
}));

app.post('./partitioned-descriptions-from-url', responding(async req => {
  const { url, topics } = JSON.parse(req.body);

  const document = await documentFromUrl(url);

  return partitionedDescription({ document, topics, partitionsOf });
}));

module.exports.handler = serverless(app);