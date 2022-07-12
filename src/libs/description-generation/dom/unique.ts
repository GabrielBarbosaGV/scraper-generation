import unique from 'unique-selector';

export const uniqueSelector = (node: Node) =>
    unique(node, { selectorTypes: ['NthChild', 'ID', 'Class', 'Tag'] });