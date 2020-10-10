export class FeedError extends Error {
  private feed: string;

  constructor(message: string, feed: string) {
    super(message);

    this.feed = feed;
  }

  toString() {
    return `Error: ${this.message}\n${this.feed}`;
  }
}
