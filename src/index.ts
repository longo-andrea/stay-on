import { Feed } from "./feed/Feed";

(async () => {
  const feed = new Feed("https://www.smashingmagazine.com/feed")
  await feed.parseFeed();

  const searchArticles = feed.getArticlesByTitle("Smashing Podcast Episode 26 With Natalia Tepluhina: What’s New In Vue 3.0?");

  console.log(searchArticles[0].getAuthor());

})();