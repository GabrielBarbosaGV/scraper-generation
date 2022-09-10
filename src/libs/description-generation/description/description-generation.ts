import { iterate, takeWhile, zipWithNext } from "../../../libs/utils/iterable";
import { indicesOf } from "../../../libs/utils/string";
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

export const partitionsOf = (s: string) => Array.from(lazyPartitionsOf(s));

function* lazyPartitionsOf(s: string) {
  for (const [start, end] of zipWithNext(distantIndicesOfNewlineOrLimit(s))) {
    yield s.slice(start, end);
  }
}

function* distantIndicesOfNewlineOrLimit(s: string) {
  let previous = 0;
  let penultimate = 0;
  let last = 0;

  yield 0;

  for (const i of indicesOfNewlineOrLimit(s)) {
    penultimate = last;

    if (i - previous > 3000) {
      previous = i;
      yield penultimate;
    }

    last = i;
  }

  yield last;
}

const by3000UpToValueIncrementer = (start: number, value: number) =>
  takeWhile(iterate(start, i => i + 3000), i => i < value);

function* indicesOfNewlineOrLimit(s: string) {
  const newlineIndicesGenerator = indicesOf(s, '\n');

  let currIndex = 0;

  while (true) {
    const { done, value } = newlineIndicesGenerator.next();

    if (done) {
      yield* by3000UpToValueIncrementer(currIndex, s.length);
      yield s.length;

      break;
    } else {
      const valueAsNumber = value as number + 1;

      yield* by3000UpToValueIncrementer(currIndex, valueAsNumber);

      currIndex = valueAsNumber;
    }
  }
}
