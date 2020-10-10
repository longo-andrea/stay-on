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
exports.Feed = void 0;
const FeedError_1 = require("./FeedError");
const FeedParser = require("feedparser");
const fetch = require('node-fetch');
class Feed {
    /**
     * @description
     * Build a Feed object
     * @param {string} url - which represents feed url
     * @param {string} [title] - which represents feed custom title
     */
    constructor(url, title) {
        if (url !== "") {
            this._url = url;
            this._title = title || "";
        }
    }
    /**
     * @description
     * Set feed's url
     * @param {string} url - feed's url
     * @throws string must not be empty or contains invalid character
     */
    set url(url) {
        if (url === "") {
            throw new FeedError_1.FeedError("Feed url must not be empty. Please, provide a valid url.", url);
        }
        this._url = url;
    }
    /**
     * @description
     * Set feed's title
     * @param {string} title - feed's title
     * @throws string must not be empty or contains invalid character
     */
    set title(title) {
        this._title = title;
    }
    /**
     * @description
     * Return feed's url
     * @return {string} which represents feed's url
     */
    get url() {
        return this._url;
    }
    /**
     * @description
     * Returns feed's title
     * @return {string} which represents feed's title
     */
    get title() {
        return this._title;
    }
    /**
     * @description
     * Returns feed's info
     * @return {object} which contains all feed's info
     */
    getInfo() {
        return this.feedStream.meta;
    }
    /**
     * @description
     * Returns feed's articles
     * @return {object[]} which contains all feed's articles
     */
    getArticles() {
        return this.articles;
    }
    /**
     * @description
     * Returns array of articles searched by title
     * @param {string} title which represents the title to search
     */
    getArticlesByTitle(title) {
        if (title !== "") {
            return this.articles.filter((article) => {
                if (article !== null && article.title) {
                    return article.title.includes(title);
                }
                else {
                    return false;
                }
            });
        }
        else {
            return [];
        }
    }
    /**
     * @description
     * Return latest article edited
     * @return {any} which is the latest article edited
     */
    getLatestArticles() {
        let latestArticleIndex = 0;
        let latestArticleDate = this.articles[latestArticleIndex].date;
        this.articles.forEach((article, index) => {
            if (article !== null && article.date) {
                if (article.date < latestArticleDate) {
                    latestArticleIndex = index;
                    latestArticleDate = article.date;
                }
            }
        });
        return this.articles[latestArticleIndex];
    }
    /**
     * @description
     * Performs feed parsing.
     * @return {Promise<void>} when the feed parsing is finished
     */
    parseFeed() {
        return new Promise((resolve, reject) => {
            this.validateFeed(this._url)
                .then(() => {
                const feedParser = new FeedParser();
                const articles = [];
                feedParser.on("error", () => {
                    reject(new FeedError_1.FeedError("Feed parsing went bad", this._url));
                });
                feedParser.on("readable", () => {
                    // get the articles
                    const article = feedParser.read();
                    articles.push(article);
                    // then store feed stream and articles list as Feed properties
                    this.feedStream = feedParser;
                    this.articles = articles;
                });
                feedParser.on("end", () => {
                    // when parsing is ended the promise comes resolved
                    resolve();
                });
                this.fetchFeed(feedParser);
            })
                .catch((error) => {
                reject(new FeedError_1.FeedError(error.message, this._url));
            });
        });
    }
    /**
     * @description
     * Returns a stingifyied feed
     * @return {string} stringyfied feed
     */
    stingifyFeed() {
        return `title:${this._title},,url:${this._url}`;
    }
    /**
     * @description
     * Builds and returns a Feed starting from a string
     * @return {string} stringyfied feed
     */
    static buildFromString(stringifyFeed) {
        const feedInfo = stringifyFeed.split(",,");
        const title = feedInfo
            .find((info) => info.includes("title:"))
            .split("title:")[1];
        const url = feedInfo.find((info) => info.includes("url:")).split("url:")[1];
        return new Feed(title, url);
    }
    /**
     * @description
     * Performs url's feed validation
     * @return {Promise<void> | never} return a promise when fetching is finished, throws an error otherwise
     */
    validateFeed(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch(url)
                .catch((error) => {
                throw new Error(error);
            });
        });
    }
    /**
     * @description
     * Fetches the feed's url
     * @param {typeof FeedParser} feedParser feed parser object which process the feed
     */
    fetchFeed(feedParser) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchedFeed = yield fetch(this._url)
                .catch((error) => {
                new FeedError_1.FeedError(error.message, this._url);
            });
            if (fetchedFeed.status !== 200) {
                throw new Error("Feed fetching is failed");
            }
            else {
                fetchedFeed.body.pipe(feedParser);
            }
        });
    }
}
exports.Feed = Feed;
//# sourceMappingURL=Feed.js.map