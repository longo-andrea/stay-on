import { resolveModuleName } from "typescript";

const FeedParser = require("feedparser") 
const fetch = require('node-fetch');

export class Feed {
  private _title: string;
  private _url: string;
  private feedStream: typeof FeedParser;
  private articles: any [];

  /**
   * @description
   * Build a Feed object
   * @param {string} [title] - which represents feed custom title
   * @param {string} url - which represents feed url
   */
  constructor(url: string, title?: string) {
    if (title !== "" && url !== "") {
      this._title = title;
      this._url = url;
    }
  }

  /**
   * @description
   * Returns feed's title
   * @return {string} which represents feed's title
   */
  public get title(): string {
    return this._title;
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
   * Set feed's title
   * @param {string} title - feed's title
   * @throws string must not be empty or contains invalid character
   */
  public set title(title: string) {
    if (title === "") {
      throw new Error(
        "the string is empty or invalid. Please, provide a valid string."
      );
    }

    this._title = title;
  }

  /**
   * @description
   * Set feed's url
   * @param {string} url - feed's url
   * @throws string must not be empty or contains invalid character
   */
  public set url(url: string) {
    if (url === "") {
      throw new Error(
        "the string is empty or invalid. Please, provide a valid string."
      );
    }

    this._url = url;
  }

  /**
   * @description
   * Return a stingify form of the feed
   * @return {string} stringyfied feed
   */
  public stingifyFeed(): string {
    return `title:${this._title},,url:${this._url}`;
  }

  static buildFromString(stringifyFeed: string): Feed {
    const feedInfo = stringifyFeed.split(",,");

    const title = feedInfo
      .find((info) => info.includes("title:"))
      .split("title:")[1];
    const url = feedInfo.find((info) => info.includes("url:")).split("url:")[1];

    return new Feed(title, url);
  }

  public parseFeed(): Promise<void> {
    return new Promise((resolve) => {
      const feedParser = new FeedParser();
      const articles: any[] = [];

      feedParser.on("error", () => {
        throw new Error("Feed parsing went bad");
      });

      feedParser.on("readable", () => {
        // get the articles
        const article = feedParser.read();
        articles.push(article);
        
        // then store feed stream and articles list as Feed properties
        this.feedStream = feedParser;
        this.articles = articles;
      });

      feedParser.on("end", () => {
        // when parsing is ended the promise comes resolved
        resolve();
      });

      this.fetchFeed(feedParser);
    });
  }

  private async validateFeed(url: string): Promise<boolean> {
    return true;
  }

  private async fetchFeed(feedParser: typeof FeedParser): Promise<void> {
    const fetchedFeed = await fetch("https://www.smashingmagazine.com/feed/");

    if (fetchedFeed.status !== 200) {
      throw new Error("Feed fetching is failed");
    } else {
      fetchedFeed.body.pipe(feedParser);
    }
  }



  public getArticle(): any [] {
    return this.articles;
  }
}
