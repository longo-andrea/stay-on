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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StayOn_1 = __importDefault(require("./StayOn"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const myFeeds = new StayOn_1.default();
    const feedList = yield myFeeds.addFeed("https://www.smashingmagazine.com/feed");
    feedList.forEach(feed => {
        console.log(feed.getTitle());
    });
    yield myFeeds.removeFeedByTitle("Articles on Smashing Magazine — For Web Designers And Developers");
    console.log(myFeeds.getFeeds().length);
}))();
//# sourceMappingURL=index.js.map