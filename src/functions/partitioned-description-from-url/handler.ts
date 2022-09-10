import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { partitionedDescription } from '@libs/description-generation/description/description-partitions';
import schema from './schema';
import { partitionsOf } from '@libs/description-generation/description/description-generation';
import { documentFromUrl } from '@libs/utils/document-from-url';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const partitionedDescriptionFromUrl: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async ({ body: { url, topics } }) => {
  const document = await documentFromUrl(url);

  const descriptions = partitionedDescription({ document, topics, partitionsOf });

  return formatJSONResponse({ descriptions });
};

export const main = middyfy(partitionedDescriptionFromUrl);
