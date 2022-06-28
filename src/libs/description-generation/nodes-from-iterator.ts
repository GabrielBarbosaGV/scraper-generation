export interface MinimalNodeIterator {
    nextNode: () => Node
}

export function* nodesFromIterator({ nextNode }: MinimalNodeIterator) {
    while (true) {
        const node = nextNode();

        if (node != null)
            yield node;
        else return;
    }
}

export const nodeArrayFromIterable = (iterable: Iterable<Node>) => Array.from(iterable);