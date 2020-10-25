export declare class FeedError extends Error {
    private feed;
    constructor(message: string, feed: string);
    toString(): string;
}
