export default {
    type: "object",
    properties: {
        url: {
            type: 'string',
            format: 'uri',
            pattern: '^https?://'
        },
        topics: {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    },
    required: ['url']
} as const;
