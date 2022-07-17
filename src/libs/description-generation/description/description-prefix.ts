import { listTopics } from "./list-topics";

export const descriptionPrefix = (topics: string[]) => `
A JSON map of the following topic strings:

${listTopics(topics)}

To the their corresponding CSS selectors, for the web page summarized below:

`;