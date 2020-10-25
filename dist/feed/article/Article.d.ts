export declare class Article {
    private title;
    private author;
    private content;
    private summary;
    private lastEditDate;
    private publishDate;
    private link;
    constructor(feedItem: any);
    /**
     * @description
     * Returns article's title
     */
    getTitle(): string;
    /**
     * @description
     * Returns article's author
     */
    getAuthor(): string;
    /**
     * @description
     * Returns article's content
     */
    getContent(): string;
    /**
     * @description
     * Returns article's summary
     */
    getSummary(): string;
    /**
     * @description
     * Returns article's last edit date
     */
    getLastEditDate(): Date;
    /**
     * @description
     * Returns article's publish date
     */
    getPublishDate(): Date;
    /**
     * @description
     * Returns article's link
     */
    getLink(): string;
}
