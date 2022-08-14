import { MinimalDocument } from "../dom/text-nodes-from-document";
import { descriptionCenter } from "./description-center";
import { descriptionPrefix } from "./description-prefix";
import { descriptionSuffix } from "./description-suffix";

interface DescriptionArgs {
    topics: string[],
    document: MinimalDocument
}

export const description = ({ topics, document }: DescriptionArgs) => [
    descriptionPrefix(topics),
    descriptionCenter(document),
    descriptionSuffix()
].join('');

interface PartitionedDescriptionArgs extends DescriptionArgs {
    partitionsOf: (string) => string[]
}

export const partitionedDescription = ({ topics, document, partitionsOf }: PartitionedDescriptionArgs) => {
    const prefix = descriptionPrefix(topics);

    const center = descriptionCenter(document);

    const partitionedCenter = partitionsOf(center);

    const suffix = descriptionSuffix();

    return partitionedCenter.map(c => [prefix, c, suffix].join(''));
};