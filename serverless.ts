import type { AWS } from '@serverless/typescript';

import descriptionFromUrl from '@functions/description-from-url';
import partitionedDescriptionsFromUrl from '@functions/partitioned-description-from-url';

const serverlessConfiguration: AWS = {
  service: 'scraper-generation',
  frameworkVersion: '3',
  plugins: [
	  'serverless-esbuild',
	  'serverless-step-functions'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
	vpc: {
		securityGroupIds: [
			'sg-7a7f271d'
		],
		subnetIds: [
			'subnet-f2808689',
			'subnet-2897dc65',
			'subnet-0120cf69'
		]
	}
  },
  // import the function via paths
  functions: {
    descriptionFromUrl,
    partitionedDescriptionsFromUrl
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      plugins: './src/esbuild-plugins.js'
    },
  },
};

module.exports = serverlessConfiguration;
