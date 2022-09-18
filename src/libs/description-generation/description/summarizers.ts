export const summarizedText = (text: string) => {
    const trimmed = text.trim();

    return trimmed.length > 30
        ? `"${trimmed.substring(0, 25)}..." (${trimmed.length} characters)`
        : `"${trimmed}"`;
}