import { MinimalDocument } from "../dom/text-nodes-from-document";
import { descriptionCenter } from "./description-center";
import { descriptionPrefix } from "./description-prefix";
import { descriptionSuffix } from "./description-suffix";

export interface DescriptionArgs {
    topics: string[],
    document: MinimalDocument
}

export const description = ({ topics, document }: DescriptionArgs) => [
    descriptionPrefix(topics),
    descriptionCenter(document),
    descriptionSuffix()
].join('');
