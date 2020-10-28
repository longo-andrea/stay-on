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
const index_1 = __importDefault(require("../index"));
const invalidFeedUrl = "https://lorem-rss.herokuapp.com/";
const feedUrl = "https://lorem-rss.herokuapp.com/feed";
describe("StayOn test", () => {
    const myFeeds = new index_1.default();
    it("getFeeds should return empty array if no feeds were added", () => {
        expect(myFeeds.getFeeds()).toEqual([]);
    });
    it("addFeed should add given feed if the url is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        yield myFeeds.addFeed(feedUrl);
        expect(myFeeds.getFeeds().length).toBe(1);
    }));
    it("addFeed should throw an error if the url is not correct", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield myFeeds.addFeed(invalidFeedUrl);
        }
        catch (error) {
            expect(error.message).toBe("Feed parsing went bad");
        }
    }));
    it("addFeed should add all given feeds if the url is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        yield myFeeds.addFeeds([feedUrl, feedUrl]);
        expect(myFeeds.getFeeds().length).toBe(3); // third is the feed added from previous test
    }));
    it("removeFeedByTitle should removed feed with given title", () => {
        myFeeds.removeFeedByTitle("Lorem ipsum feed for an interval of 1 minutes with 10 item(s)");
        expect(myFeeds.getFeeds().length).toBe(0);
    });
});
//# sourceMappingURL=StayOn.test.js.map