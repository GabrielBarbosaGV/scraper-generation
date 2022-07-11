export const summarizedText = (text: string) =>
    text.length > 30
    ? `"${text.substring(0, 25)}..." (${text.length} characters)`
    : `"${text}"`;
