import { Feed } from "./feed/Feed";

(async () => {
  const feed = new Feed("https://www.smashingmagazine.com/feed")
  await feed.parseFeed();

  // const searchArticles = feed.getArticlesByTitle("Using WebXR");

  const article = feed.getLatestArticles();

  console.log(article.title)

})();