import { Feed } from "./types/Feed";

const feed = new Feed("Smashing Magazine", "sada");

  feed.parseFeed()
    .then(() => {
      console.log(feed.getArticle()[0]);
    });

