export interface MinimalNodeIterator {
    nextNode: () => Node
}

export function* iterableFromNodeIterator({ nextNode }: MinimalNodeIterator) {
    while (true) {
        const node = nextNode();

        if (node != null)
            yield node;
        else return;
    }
}

export const nodeArrayFromIterable = (iterable: Iterable<Node>) => Array.from(iterable);

export const nodeArrayFromNodeIterator = (iterator: MinimalNodeIterator) =>
    nodeArrayFromIterable(iterableFromNodeIterator(iterator));