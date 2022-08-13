import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { description as descriptionOf } from '@libs/description-generation/description/description-generation';
import { middyfy } from '@libs/lambda';
import { documentFromUrl } from '@libs/utils/document-from-url';

import schema from './schema';

const descriptionFromUrl: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async ({ body: { url, topics } }) => {
  const document = await documentFromUrl(url);
  
  const description = descriptionOf({ document, topics });

  return formatJSONResponse({ description });
};

export const main = middyfy(descriptionFromUrl);
