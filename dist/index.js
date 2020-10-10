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
(() => __awaiter(void 0, void 0, void 0, function* () {
    const feed = new Feed_1.Feed("https://www.smashingmagazine.com/feed");
    yield feed.parseFeed();
    // const searchArticles = feed.getArticlesByTitle("Using WebXR");
    const article = feed.getLatestArticles();
    console.log(article.title);
}))();
//# sourceMappingURL=index.js.map