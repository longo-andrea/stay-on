import StayOn from "../src/index"
import {Feed} from "../src/feed/Feed";

const invalidFeedUrl = "https://lorem-rss.herokuapp.com/";
const feedUrl = "https://lorem-rss.herokuapp.com/feed";

describe("StayOn test", () => {
  describe("no feed were added", () => {
    it("getFeeds should return empty array if no feeds were added", () => {
      const emptyFeeds = new StayOn();

      expect(emptyFeeds.getFeeds()).toEqual([]);
    });

    it("getFeedsByTitle should return empty array if no feeds were added", () => {
      const emptyFeeds = new StayOn();
      
      expect(emptyFeeds.getFeedsByTitle("title")).toEqual([]);
    });

    it("addFeed should add given feed if the url is correct", async () => {
      const myFeeds = new StayOn();
      await myFeeds.addFeed(feedUrl);

      expect(myFeeds.getFeeds().length).toBe(1);
    });

    it("addFeed should throw an error if the url is not correct", async () => {
      try {
        const myFeeds = new StayOn();
        await myFeeds.addFeed(invalidFeedUrl);
      } catch(error) {
        expect(error.message).toBe("Feed parsing went bad");
      }
    });

    it("addFeed should add all given feeds if the url is correct", async () => {
      const myFeeds = new StayOn();
      await myFeeds.addFeeds([feedUrl, feedUrl]);

      expect(myFeeds.getFeeds().length).toBe(2);
    });
  });

  describe("populated with feeds", () => {
    it("getFeeds should return feeds", async () => {
      const myFeeds = new StayOn();
      await myFeeds.addFeeds([feedUrl, feedUrl]);
      
      expect(myFeeds.getFeeds().length).toBe(2);
    });

    it("getFeedsByTitle should return feeds which title match the given title", async () => {
      const myFeeds = new StayOn();
      await myFeeds.addFeeds([feedUrl, feedUrl]);
      
      expect(myFeeds.getFeedsByTitle("Lorem").length).toBe(2);
    });

    it("getFeedsByTitle should return empty array if there aren't feeds which title match the given title", async () => {
      const myFeeds = new StayOn();
      await myFeeds.addFeeds([feedUrl, feedUrl]);
      
      expect(myFeeds.getFeedsByTitle("title").length).toBe(0);
    });

    it("removeFeedByTitle should removed feed with given title", async () => {
      const myFeeds = new StayOn();
      await myFeeds.addFeeds([feedUrl, feedUrl]);

      myFeeds.removeFeedByTitle("Lorem ipsum feed for an interval of 1 minutes with 10 item(s)");

      expect(myFeeds.getFeeds().length).toBe(0);
    });

    it("removeFeedByTitle should not remove feed if there aren't feed which match with given title", async () => {
      const myFeeds = new StayOn();
      await myFeeds.addFeeds([feedUrl, feedUrl]);

      myFeeds.removeFeedByTitle("title");

      expect(myFeeds.getFeeds().length).toBe(2);
    });
  });
});