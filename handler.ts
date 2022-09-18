import serverless from 'serverless-http';
import express from 'express';
import { description as descriptionFor } from './src/libs/description-generation/description/description-generation';
import { ResponseStatus } from './src/constants';
import { documentFromUrl } from './src/libs/description-generation/fetching/document-from-url';
import { partitionedDescription } from './src/libs/description-generation/description/description-partitions';
import { partitionsOf } from './src/libs/description-generation/description/description-generation';

const app = express();

app.post('/description-from-url', async (req, res) => {
  try {
    const { url, topics } = JSON.parse(req.body);

    const document = await documentFromUrl(url);

    const description = descriptionFor({ document, topics });

    return res.status(ResponseStatus.RES_OK).json({ description });
  } catch (err) {
    console.log(`Requisition with body ${req.body} errored with ${err}`);
    return res.status(ResponseStatus.INTERNAL_SERVER_ERROR);
  }
});

app.post('/partitioned-descriptions-from-url', async (req, res) => {
  try {
    const { url, topics } = JSON.parse(req.body);

    const document = await documentFromUrl(url);

    const descriptions = partitionedDescription({ document, topics, partitionsOf });

    return res.status(ResponseStatus.RES_OK).json({ descriptions });
  } catch (err) {
    console.log(`Requisition with body ${req.body} errored with ${err}`);
    return res.status(ResponseStatus.INTERNAL_SERVER_ERROR);
  }
});

module.exports.handler = serverless(app);