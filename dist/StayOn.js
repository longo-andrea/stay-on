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
const Feed_1 = require("./feed/Feed");
class default_1 {
    constructor() {
        this.feeds = [];
    }
    /**
     * @description
     * Return feeds list
     * @return {Feed[]} return feeds list
     */
    getFeeds() {
        return this.feeds;
    }
    /**
     * @description
     * Add given feed and return feeds list
     * @param {string} feedUrl which represents feed's url
     * @returns {Promise<Feed[]> | never} an array which contains all feeds
     */
    addFeed(feedUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Feed_1.Feed.validateFeed(feedUrl);
                const feed = new Feed_1.Feed(feedUrl);
                yield feed.parseFeed();
                this.feeds.push(feed);
                return this.feeds;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /**
     * @description
     * Add given feeds and return feeds list
     * @param {string[]} feedsUrl which represents feeds url
     * @returns {Promise<Feed[]> | never} an array which contains all feeds
     */
    addFeeds(feedsUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                feedsUrl.forEach((feedUrl) => __awaiter(this, void 0, void 0, function* () {
                    yield this.addFeed(feedUrl);
                }));
                return this.feeds;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /**
     * @description
     * Removes feed with given title
     * @param {string} title which represents feed to remove
     * @returns {Feed[]} which contains current feed list
     */
    removeFeedByTitle(title) {
        this.feeds.forEach((feed, index) => {
            if (feed.getTitle() === title) {
                this.feeds.splice(index, 1);
            }
        });
        return this.feeds;
    }
}
exports.default = default_1;
;
//# sourceMappingURL=StayOn.js.map