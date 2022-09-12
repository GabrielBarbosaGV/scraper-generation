import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';
import { AWS } from '@serverless/typescript';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 20,
  events: [
    {
      http: {
        method: 'post',
        path: 'descriptionFromUrl',
        request: {
          schemas: {
            'application/json': schema
          }
        }
      }
    }
  ]
} as AWS['functions']['partitionedDescriptionsFromUrl'];
