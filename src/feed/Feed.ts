import {FeedError} from "./error/FeedError";
import {Article} from "./article/Article";

const FeedParser = require("feedparser") 
const fetch = require('node-fetch');

export class Feed {
  private _url: string;
  private feedStream: typeof FeedParser;
  private articles: Article[];

  /**
   * @description
   * Build a Feed object
   * @param {string} url - which represents feed url
   * @param {string} [title] - which represents feed custom title
   */
  constructor(url: string) {
    if (url !== "") {
      this._url = url;
      this.articles = [];
    }
  }

  /**
   * @description
   * Set feed's url
   * @param {string} url - feed's url
   * @throws string must not be empty or contains invalid character
   */
  public set url(url: string) {
    if (url === "") {
      throw new FeedError("Feed url must not be empty. Please, provide a valid url.", url);
    }

    this._url = url;
  }
  
  /**
   * @description
   * Return feed's url
   * @return {string} which represents feed's url
   */
  public get url(): string {
    return this._url;
  }

  /**
   * @description
   * Returns feed's title
   * @return {string} which represents feed's title
   */
  public getTitle(): string {
    if (this.feedStream) {
      return this.feedStream.meta.title;
    } else {
      throw new FeedError("You must fetch feed first", this._url)
    }
  }

  /**
   * @description
   * Returns feed's info
   * @return {object} which contains all feed's info
   */
  public getInfo(): object {
    if (this.feedStream) {
      return this.feedStream.meta;
    } else {
      throw new FeedError("You must fetch feed first", this._url)
    }
  }

  /**
   * @description
   * Returns feed's articles
   * @return {Article[]} which contains all feed's articles
   */
  public getArticles(): Article[] {
    return this.articles;
  }

  /**
   * @description
   * Returns array of articles searched by title
   * @param {Article[]} title which represents the title to search
   */
  public getArticlesByTitle(title: string): Article[] {
    if (title !== "") {
      return this.articles.filter((article) => {
        if (article !== null && article.getTitle()) {
          return article.getTitle().includes(title);
        } else {
          return [];
        }
      });
    } else {
      return [];
    }
  }

  /**
   * @description
   * Return latest article edited
   * @return {any} which is the latest article edited
   */
  public getLatestArticle(): Article | null {
    if (this.articles.length !== 0) {
      let latestArticleIndex = 0;
      let latestArticleDate = this.articles[latestArticleIndex].getLastEditDate();
  
      this.articles.forEach((article, index) => {
        if (article !== null && article.getLastEditDate()) {
          if (article.getLastEditDate() < latestArticleDate) {
            latestArticleIndex = index;
            latestArticleDate = article.getLastEditDate();
          }
        }
      });
  
      return this.articles[latestArticleIndex];
    }

    return null;
  }

  /**
   * @description
   * Performs feed parsing.
   * @return {Promise<void>} when the feed parsing is finished
   */
  public async parseFeed(): Promise<void | unknown> | never {
    return new Promise((resolve, reject) => {
      Feed.validateFeed(this._url)
        .then(() => {
          const feedParser = new FeedParser();
          const articles: Article[] = [];

          feedParser.on("error", (error: any) => {
            reject(new FeedError("Feed parsing went bad", this._url));
          });

          feedParser.on("readable", () => {
            // get the articles
            const parsedArticle = feedParser.read();

            if (parsedArticle !== null) {
              articles.push(new Article(parsedArticle));
            }
            
            // then store feed stream and articles list as Feed properties
            this.feedStream = feedParser;
            this.articles = articles;
          });

          feedParser.on("end", () => {
            // when parsing is ended the promise comes resolved
            resolve();
          });

          this.fetchFeed(feedParser);
        })
        .catch((error) => {
          reject(new FeedError(error.message, this._url));
        });
    });
  }

  /**
   * @description
   * Returns a stingifyied feed
   * @return {string} stringyfied feed
   */
  public stringifyFeed(): string {
    return `url:${this._url}`;
  }

  /**
   * @description
   * Performs url's feed validation
   * @return {Promise<void> | never} return a promise when fetching is finished, throws an error otherwise
   */
  static async validateFeed(url: string): Promise<void> | never {
    return fetch(url)
      .catch((error: string) => {
        throw new Error(error);
      });
  }

  /**
   * @description
   * Fetches the feed's url
   * @param {typeof FeedParser} feedParser feed parser object which process the feed
   */
  private async fetchFeed(feedParser: typeof FeedParser): Promise<void> {
    const fetchedFeed = await fetch(this._url)
      .catch((error: Error) => {
        new FeedError(error.message, this._url)
      });

    if (fetchedFeed.status !== 200) {
      throw new Error("Feed fetching is failed");
    } else {
      fetchedFeed.body.pipe(feedParser);
    }
  }
}
