import unique from 'unique-selector';

export const uniqueSelector = (node: Node) =>
    unique(node, { selectorTypes: ['ID', 'Class', 'Tag', 'NthChild'] });