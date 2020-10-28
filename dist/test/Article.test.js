"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Article_1 = require("../feed/article/Article");
const feedItemMock = {
    title: "Mock Feed",
    author: "Andrea Longo",
    description: "Hello, I'm the content!",
    summary: "This is a mock",
    date: new Date(),
    pubdate: new Date(),
    link: "https://github.com/longo-andrea/stay-on",
};
const feedItemMockEmpty = {};
describe('article test', () => {
    describe('is constructed correctly', () => {
        const article = new Article_1.Article(feedItemMock);
        it("getTitle return feed's title", () => {
            expect(article.getTitle()).toBe("Mock Feed");
        });
        it("getAuthor return feed's author", () => {
            expect(article.getAuthor()).toBe("Andrea Longo");
        });
        it("getContent return feed's content", () => {
            expect(article.getContent()).toBe("Hello, I'm the content!");
        });
        it("getSummary return feed's summary", () => {
            expect(article.getSummary()).toBe("This is a mock");
        });
        it("getLastEdit return feed's last edit", () => {
            expect(article.getLastEditDate()).toBe(feedItemMock.date);
        });
        it("getPublishDate return feed's publish date", () => {
            expect(article.getPublishDate()).toBe(feedItemMock.pubdate);
        });
        it("getLink return feed's link", () => {
            expect(article.getLink()).toBe("https://github.com/longo-andrea/stay-on");
        });
    });
    describe('is not constructed correctly', () => {
        const article = new Article_1.Article(feedItemMockEmpty);
        it("getTitle return feed's title", () => {
            expect(article.getTitle()).toBe("");
        });
        it("getAuthor return feed's author", () => {
            expect(article.getAuthor()).toBe("");
        });
        it("getContent return feed's content", () => {
            expect(article.getContent()).toBe("");
        });
        it("getSummary return feed's summary", () => {
            expect(article.getSummary()).toBe("");
        });
        it("getLastEdit return feed's last edit", () => {
            expect(article.getLastEditDate()).toBe(null);
        });
        it("getPublishDate return feed's publish date", () => {
            expect(article.getPublishDate()).toBe(null);
        });
        it("getLink return feed's link", () => {
            expect(article.getLink()).toBe("");
        });
    });
});
//# sourceMappingURL=Article.test.js.map