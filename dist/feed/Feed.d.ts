import { Article } from "./article/Article";
export declare class Feed {
    private _url;
    private feedStream;
    private articles;
    /**
     * @description
     * Build a Feed object
     * @param {string} url - which represents feed url
     * @param {string} [title] - which represents feed custom title
     */
    constructor(url: string);
    /**
     * @description
     * Set feed's url
     * @param {string} url - feed's url
     * @throws string must not be empty or contains invalid character
     */
    set url(url: string);
    /**
     * @description
     * Return feed's url
     * @return {string} which represents feed's url
     */
    get url(): string;
    /**
     * @description
     * Returns feed's title
     * @return {string} which represents feed's title
     */
    getTitle(): string;
    /**
     * @description
     * Returns feed's info
     * @return {object} which contains all feed's info
     */
    getInfo(): object;
    /**
     * @description
     * Returns feed's articles
     * @return {Article[]} which contains all feed's articles
     */
    getArticles(): Article[];
    /**
     * @description
     * Returns array of articles searched by title
     * @param {Article[]} title which represents the title to search
     */
    getArticlesByTitle(title: string): Article[];
    /**
     * @description
     * Return latest article edited
     * @return {any} which is the latest article edited
     */
    getLatestArticle(): Article | null;
    /**
     * @description
     * Performs feed parsing.
     * @return {Promise<void>} when the feed parsing is finished
     */
    parseFeed(): Promise<void | unknown> | never;
    /**
     * @description
     * Returns a stingifyied feed
     * @return {string} stringyfied feed
     */
    stingifyFeed(): string;
    /**
     * @description
     * Builds and returns a Feed starting from a string
     * @return {string} stringyfied feed
     */
    static buildFromString(stringifyFeed: string): Feed;
    /**
     * @description
     * Performs url's feed validation
     * @return {Promise<void> | never} return a promise when fetching is finished, throws an error otherwise
     */
    static validateFeed(url: string): Promise<void> | never;
    /**
     * @description
     * Fetches the feed's url
     * @param {typeof FeedParser} feedParser feed parser object which process the feed
     */
    private fetchFeed;
}
