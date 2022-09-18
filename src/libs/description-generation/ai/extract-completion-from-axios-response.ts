import { CreateCompletionResponse } from "openai";

export interface Response {
    data: CreateCompletionResponse
}

export const extractedFrom = ({ data }: Response) => data.choices?.[0].text;