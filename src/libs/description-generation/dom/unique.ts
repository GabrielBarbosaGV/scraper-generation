const unique = require('unique-selector').default;

export const uniqueSelector = (node: Node) =>
    unique(node, { selectorTypes: ['ID', 'Class', 'Tag', 'NthChild'] });