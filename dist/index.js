"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Feed_1 = require("./types/Feed");
const feed = new Feed_1.Feed("Smashing Magazine", "sada");
feed.parseFeed()
    .then(() => {
    console.log(feed.getArticle()[0]);
});
//# sourceMappingURL=index.js.map