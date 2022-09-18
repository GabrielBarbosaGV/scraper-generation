import { descriptionCenter } from "./description-center";
import { DescriptionArgs } from "./description-generation";
import { descriptionPrefix } from "./description-prefix";
import { descriptionSuffix } from "./description-suffix";

interface PartitionedDescriptionArgs extends DescriptionArgs {
  partitionsOf: (s: string) => string[]
}

export const partitionedDescription = ({ topics, document, partitionsOf }: PartitionedDescriptionArgs) => {
  const prefix = descriptionPrefix(topics);

  const center = descriptionCenter(document);

  const partitionedCenter = partitionsOf(center);

  const suffix = descriptionSuffix();

  return partitionedCenter.map((c) => `${prefix}${c}${suffix}`);
};
