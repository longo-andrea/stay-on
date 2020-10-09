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
const FeedParser = require("feedparser");
const fetch = require('node-fetch');
class Feed {
    /**
     * @description
     * Build a Feed object
     * @param {string} title - which represents feed title
     * @param {string} url - which represents feed url
     */
    constructor(title, url) {
        if (title !== "" && url !== "") {
            this._title = title;
            this._url = url;
        }
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
     * Return feed's url
     * @return {string} which represents feed's url
     */
    get url() {
        return this._url;
    }
    /**
     * @description
     * Set feed's title
     * @param {string} title - feed's title
     * @throws string must not be empty or contains invalid character
     */
    set title(title) {
        if (title === "") {
            throw new Error("the string is empty or invalid. Please, provide a valid string.");
        }
        this._title = title;
    }
    /**
     * @description
     * Set feed's url
     * @param {string} url - feed's url
     * @throws string must not be empty or contains invalid character
     */
    set url(url) {
        if (url === "") {
            throw new Error("the string is empty or invalid. Please, provide a valid string.");
        }
        this._url = url;
    }
    /**
     * @description
     * Return a stingify form of the feed
     * @return {string} stringyfied feed
     */
    stingifyFeed() {
        return `title:${this._title},,url:${this._url}`;
    }
    static buildFromString(stringifyFeed) {
        const feedInfo = stringifyFeed.split(",,");
        const title = feedInfo
            .find((info) => info.includes("title:"))
            .split("title:")[1];
        const url = feedInfo.find((info) => info.includes("url:")).split("url:")[1];
        return new Feed(title, url);
    }
    parseFeed() {
        return new Promise((resolve) => {
            const feedParser = new FeedParser();
            const articles = [];
            feedParser.on("error", () => {
                throw new Error("Feed parsing went bad");
            });
            feedParser.on("readable", () => {
                // store feed stream as Feed property
                this.feedStream = feedParser;
                const article = feedParser.read();
                articles.push(article);
                this.articles = articles;
            });
            feedParser.on("end", () => {
                // when parsing is ended the promise comes resolved
                resolve();
            });
            this.fetchFeed(feedParser);
        });
    }
    validateFeed(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    fetchFeed(feedParser) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchedFeed = yield fetch("https://www.smashingmagazine.com/feed/");
            if (fetchedFeed.status !== 200) {
                throw new Error("Feed fetching is failed");
            }
            else {
                fetchedFeed.body.pipe(feedParser);
            }
        });
    }
    getArticle() {
        return this.articles;
    }
}
exports.Feed = Feed;
//# sourceMappingURL=Feed.js.map