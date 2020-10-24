"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
class Article {
    constructor(feedItem) {
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
    getTitle() {
        return this.title;
    }
    /**
     * @description
     * Returns article's author
     */
    getAuthor() {
        return this.author;
    }
    /**
     * @description
     * Returns article's content
     */
    getContent() {
        return this.content;
    }
    /**
     * @description
     * Returns article's summary
     */
    getSummary() {
        return this.summary;
    }
    /**
     * @description
     * Returns article's last edit date
     */
    getLastEditDate() {
        return this.lastEditDate;
    }
    /**
     * @description
     * Returns article's publish date
     */
    getPublishDate() {
        return this.publishDate;
    }
    /**
     * @description
     * Returns article's link
     */
    getLink() {
        return this.link;
    }
}
exports.Article = Article;
;
//# sourceMappingURL=Article.js.map