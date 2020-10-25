export class FeedError extends Error {
  private feed: string;

  constructor(message: string, feed: string) {
    super(message);

    this.feed = feed;
  }

  public toString(): string {
    return `Error: ${this.message}\n${this.feed}`;
  }
}
