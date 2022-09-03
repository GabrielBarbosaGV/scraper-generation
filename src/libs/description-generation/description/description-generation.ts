import { MinimalDocument } from "../dom/text-nodes-from-document";
import { descriptionCenter } from "./description-center";
import { descriptionPrefix } from "./description-prefix";
import { descriptionSuffix } from "./description-suffix";
import { chompLinesUpToNCharacters } from "./string-chomper";

export interface DescriptionArgs {
    topics: string[],
    document: MinimalDocument
}

export const description = ({ topics, document }: DescriptionArgs) => [
    descriptionPrefix(topics),
    descriptionCenter(document),
    descriptionSuffix()
].join('');

export const partitionsOf = (s: string) => {
    let curr: string, rest: string;

    rest = s;

    return Array.from(
        function*() {
            while (rest.length > 0) {
                [curr, rest] = chompLinesUpToNCharacters(rest, 3000);

                yield curr;
            }
        }()
    );
}
