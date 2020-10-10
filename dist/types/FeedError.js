"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedError = void 0;
class FeedError extends Error {
    constructor(message, feed) {
        super(message);
        this.feed = feed;
    }
    toString() {
        return `Error: ${this.message}\n${this.feed}`;
    }
}
exports.FeedError = FeedError;
//# sourceMappingURL=FeedError.js.map