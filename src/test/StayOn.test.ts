import StayOn from "../index"
import {Feed} from "../feed/Feed";

const invalidFeedUrl = "https://lorem-rss.herokuapp.com/";
const feedUrl = "https://lorem-rss.herokuapp.com/feed";

describe("StayOn test", () => {
  const myFeeds = new StayOn();

  it("getFeeds should return empty array if no feeds were added", () => {
    expect(myFeeds.getFeeds()).toEqual([]);
  });

  it("addFeed should add given feed if the url is correct", async () => {
    await myFeeds.addFeed(feedUrl);

    expect(myFeeds.getFeeds().length).toBe(1);
  });

  it("addFeed should throw an error if the url is not correct", async () => {
    try {
      await myFeeds.addFeed(invalidFeedUrl);
    } catch(error) {
      expect(error.message).toBe("Feed parsing went bad");
    }
  });

  it("addFeed should add all given feeds if the url is correct", async () => {
    await myFeeds.addFeeds([feedUrl, feedUrl]);

    expect(myFeeds.getFeeds().length).toBe(3); // third is the feed added from previous test
  });

  it("removeFeedByTitle should removed feed with given title", () => {
    myFeeds.removeFeedByTitle("Lorem ipsum feed for an interval of 1 minutes with 10 item(s)");

    expect(myFeeds.getFeeds().length).toBe(0);
  });
});