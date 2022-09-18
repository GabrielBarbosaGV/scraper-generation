import serverless from 'serverless-http';
import express from 'express';
import { documentFromText } from './src/libs/description-generation/dom/document-acquisition';
import { description as descriptionFor } from './src/libs/description-generation/description/description-generation';
import { MinimalDocument } from './src/libs/description-generation/dom/text-nodes-from-document';
import fetch from 'node-fetch';
import { ResponseStatus } from './src/constants';

const app = express();

app.post('/description-from-url', async (req, res) => {
  try {
    const { url, topics } = JSON.parse(req.body);

    const fetched = await fetch(url);

    const text = await fetched.text();

    const document = documentFromText(text) as MinimalDocument;

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

    const fetched = await fetch(url);

    const text = await fetched.text();
  }
});

module.exports.handler = serverless(app);