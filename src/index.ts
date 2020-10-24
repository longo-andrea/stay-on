import StayOn from "./StayOn";

(async () => {
  const myFeeds = new StayOn();
  const feedList = await myFeeds.addFeed("https://www.smashingmagazine.com/feed");

  feedList.forEach(feed => {
    console.log(feed.getTitle());
  })

  await myFeeds.removeFeedByTitle("Articles on Smashing Magazine — For Web Designers And Developers");

  console.log(myFeeds.getFeeds().length);
})();