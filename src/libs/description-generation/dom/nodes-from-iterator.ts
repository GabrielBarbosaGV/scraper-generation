export interface MinimalNodeIterator {
    nextNode: () => Node
}

export function* iterableFromNodeIterator(nodeIterator: MinimalNodeIterator) {
    while (true) {
        const node = nodeIterator.nextNode();

        if (node) yield node;
        else return;
    }
}

export const nodeArrayFromIterable = (iterable: Iterable<Node>) => Array.from(iterable);

export const nodeArrayFromNodeIterator = (iterator: MinimalNodeIterator) =>
    nodeArrayFromIterable(iterableFromNodeIterator(iterator));