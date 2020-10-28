"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Feed_1 = require("../feed/Feed");
const invalidFeedUrl = "https://lorem-rss.herokuapp.com/";
const feedUrl = "https://lorem-rss.herokuapp.com/feed";
describe("feed test", () => {
    describe("feed is not valid", () => {
        const invalidFeed = new Feed_1.Feed(invalidFeedUrl);
        it("get feed's url", () => {
            expect(invalidFeed.url).toBe(invalidFeedUrl);
        });
        it("should fail to parse feed", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield invalidFeed.parseFeed();
            }
            catch (error) {
                expect(error.message).toEqual("Feed parsing went bad");
            }
        }));
    });
    describe("feed is valid", () => {
        describe("feed not parsed", () => {
            const feed = new Feed_1.Feed(feedUrl);
            it("get feed's url", () => {
                expect(feed.url).toBe(feedUrl);
            });
            it("getTitle should throw an error if feed isn't parsed yet", () => {
                try {
                    feed.getTitle();
                }
                catch (error) {
                    expect(error.message).toBe("You must fetch feed first");
                }
            });
            it("getInfo should throw an error if feed isn't parsed yet", () => {
                try {
                    feed.getInfo();
                }
                catch (error) {
                    expect(error.message).toBe("You must fetch feed first");
                }
            });
            it("getArticles should throw an empty array if feed isn't parsed yet", () => {
                expect(feed.getArticles()).toEqual([]);
            });
            it("getArticlesByTitle should throw an empty array if feed isn't parsed yet", () => {
                expect(feed.getArticlesByTitle("Title")).toEqual([]);
            });
            it("getLatestArticle should throw an empty array if feed isn't parsed yet", () => {
                expect(feed.getLatestArticle()).toEqual(null);
            });
            it("stringifyFeed should return the feed in a string form", () => {
                expect(feed.stingifyFeed()).toBe(`url:${feedUrl}`);
            });
            it("buildFromString should build a feed from string", () => {
                const url = `url:${feedUrl}`;
                const rebuiltFeed = Feed_1.Feed.buildFromString(url);
                expect(rebuiltFeed.url).toBe(feedUrl);
            });
        });
        describe("feed parsed", () => {
            const feed = new Feed_1.Feed(feedUrl);
            it("getTitle should return feed's title", () => __awaiter(void 0, void 0, void 0, function* () {
                yield feed.parseFeed();
                expect(feed.getTitle()).toBe("Lorem ipsum feed for an interval of 1 minutes with 10 item(s)");
            }));
            it("getInfo should return feed's info", () => {
                // can't check object itself, so I check only if info object is not empty
                expect(feed.getInfo()).not.toBe({});
            });
            it("getArticles should return feed's articles", () => {
                // can't check artices, so I check only if articles contains 10 articles (which is # of articles emitted by lorem ipsum feed)
                expect(feed.getArticles().length).toBe(10);
            });
            it("getArticlesByTitle should return matched articles", () => {
                expect(feed.getArticlesByTitle("Lorem ipsum")[0].getTitle()).toContain("Lorem ipsum");
            });
            it("getArticlesByTitle should return empty array if there are no matches", () => {
                expect(feed.getArticlesByTitle("Title")).toEqual([]);
            });
            it("getLatestArticle should return latest article", () => {
                const latestArticle = feed.getLatestArticle();
                if (latestArticle) {
                    expect(latestArticle.getTitle()).toContain("Lorem ipsum");
                }
            });
        });
        describe("change feed url", () => {
            const feed = new Feed_1.Feed(feedUrl);
            it("get feed's url", () => {
                feed.url = invalidFeedUrl;
                expect(feed.url).toBe(invalidFeedUrl);
            });
            it("should throw an error if empty url is passed as argument", () => {
                try {
                    feed.url = "";
                }
                catch (error) {
                    expect(error.message).toBe("Feed url must not be empty. Please, provide a valid url.");
                }
            });
        });
    });
});
//# sourceMappingURL=Feed.test.js.map