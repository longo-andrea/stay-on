export class Article {
  private title: string;
  private author: string;
  private content: string;
  private summary: string;
  private lastEditDate: Date;
  private publishDate: Date;
  private link: string;

  constructor(feedItem: any) {
    this.title = feedItem.title || "";
    this.author = feedItem.author || "";
    this.content = feedItem.description || "";
    this.summary = feedItem.summary || "";
    this.lastEditDate = feedItem.date || new Date();
    this.publishDate = feedItem.pubdate || new Date();
    this.link = feedItem.link || "";
  }

  /**
   * @description
   * Returns article's title
   */
  public getTitle(): string {
    return this.title;
  }

  /**
   * @description
   * Returns article's author
   */
  public getAuthor(): string {
    return this.author;
  }

  /**
   * @description
   * Returns article's content
   */
  public getContent(): string {
    return this.content;
  }

  /**
   * @description
   * Returns article's summary
   */
  public getSummary(): string {
    return this.summary;
  }

  /**
   * @description
   * Returns article's last edit date
   */
  public getLastEditDate(): Date {
    return this.lastEditDate;
  }

  /**
   * @description
   * Returns article's publish date
   */
  public getPublishDate(): Date {
    return this.publishDate;
  }

  /**
   * @description
   * Returns article's link
   */
  public getLink(): string {
    return this.link;
  }

};
