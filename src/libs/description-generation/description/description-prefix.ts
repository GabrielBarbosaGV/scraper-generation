import { listTopics } from "./list-topics";

export const descriptionPrefix = (topics: string[]) => `
A JSON map of the following topic strings:

${listTopics(topics)}

To their corresponding DOM elements, or null, if not present, for the web page summarized below:

`;