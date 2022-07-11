import { ExtractorArgs } from "./page-representation";
import { summarizedText } from "./summarizers";

export const extractSummarizing = ({ selector, querySelector }: ExtractorArgs) =>
    summarizedText(querySelector(selector).firstChild.textContent);