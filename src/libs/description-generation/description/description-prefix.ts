import { listTopics } from "./list-topics";

export const descriptionPrefix = (topics: string[]) => `
    A map of topics to CSS selectors, given the following topics:

    ${listTopics(topics)}

`;