import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { description as descriptionOf } from '@libs/description-generation/description/description-generation';
import { documentFromText } from '@libs/description-generation/dom/document-acquisition';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const descriptionFromUrl: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async ({ body: { url, topics } }) => {
  const response = await fetch(url);

  const text = await response.text();
  
  const document = documentFromText(text);
  
  const description = descriptionOf({ document, topics });

  return formatJSONResponse({ description });
};

export const main = middyfy(descriptionFromUrl);
