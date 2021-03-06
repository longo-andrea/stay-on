# DESCRIPTION

<img src="./src/assets/logo.png" alt="StayOn Logo" style="width: 50%; display: block; margin: 20px auto" />

***StayOn*** is a simple feed manager library in Node and TypeScript.
StayOn helps in the process of feed subscription, and the way to obtain its main information.
You can add/remove feeds, get latest articles, and some other properties in a easy way.

## Useful links

- [GitHub page](https://github.com/longo-andrea/stay-on) Feel free to open issue for bugs or feature improvements. 
- [npm](https://www.npmjs.com/package/stay-on) Include npm package into you projects.

## How is StayOn composed?

StayOn is composed by 4 main class:
- *Feed*: which represents the feed and contains all related information;
- *FeedError*: which provides custom error for Feed class;
- *Article*: which represents the single article, it contains all realted information like title, summary, last update, content, etc..
- *StayOn*: which is the main container, it offers a simple way to handle feeds and some methods to retrieve useful information.

# GETTING STARTED

## Installation
StayOn can be simply installed via ***npm***:

```
  npm install stay-on
```

Or, alternatively, you can download latest release from [GitHub page](https://github.com/longo-andrea/stay-on/releases). In this case you have to build it before using.

```
  npm install // to install npm node_modules
  npm run build // to build stay-on package
```

## Example
Once you have installed StayOn, you can start using it!
Let's see an example.

````
import StayOn from "stay-on";

(async() => { 
  // 1. Build a new StayOn to store feeds
  const myFeed = new StayOn();


  // 2. Add all the feeds we want
  await myFeed.addFeed("https://lorem-rss.herokuapp.com/feed");
  await myFeed.addFeed("https://lorem-rss.herokuapp.com/feed");
  await myFeed.addFeed("https://lorem-rss.herokuapp.com/feed");


  // Alternatively, if you want to add more feeds at one time, you can use addFeeds method
  await myFeed.addFeed(["https://lorem-rss.herokuapp.com/feed", 
                        "https://lorem-rss.herokuapp.com/feed",
                        "https://lorem-rss.herokuapp.com/feed"]);


  // 3. Retrieve all the info we want from our feed list. Some examples below

  // 3.1 Console.log the title of each feed
  myFeed.getFeeds().forEach((feed) => {
    console.log(feed.getTitle());
  });
  
  // 3.2 Console.log the title of each articles on the first feed
  myFeed.getFeeds()[0]
    .getArticles().forEach((article) => {
      console.log(article.getTitle());
    });
})();
````

# DOCUMENTATION

> **StayOn**:
- [getFeeds()](#getfeeds-feed)
- [getFeedsByTitle(title: string)](#getfeedsbytitletitle-string-feed)
- [async addFeed(feedUrl: string)](#async-addfeedfeedurl-string-promisefeed--never)
- [async addFeeds(feedsUrl: string[])](#async-addfeedsfeedsurl-string-promisefeed--never)
- [removeFeedByTitle(title: string)](#removefeedbytitletitle-string-feed)
- [stringify()](#stringify-string)
- [static async buildFromString(stringifiedStayOn: string)](#static-async-buildfromstringstringifiedstayon-string-promisestayon)

> **Feed**:
- [constructor(url: string)](#constructorurl-string)
- [getTitle()](#gettitle-string)
- [getInfo()](#getinfo-object)
- [getArticles()](#getarticles-article)
- [getArticlesByTitle(title: string)](#getarticlesbytitletitle-string-article)
- [getLatestArticles()](#getlatestarticles-article)
- [getArticlesByTitle(title: string)](#getarticlesbytitletitle-string-article)
- [getLatestArticles()](#getlatestarticles-article)
- [async parseFeed()](#async-parsefeed-promisevoid--unknown--never)
- [stingifyFeed()](#stingifyfeed-string)
- [async validateFeed(url: string)](#async-validatefeedurl-string-promise-never)

> **FeedError**
- [constructor(message: string, feed: string)](#constructormessage-string-feed-string)
- [toString()](#tostring-string)

> **Articles**
- [getTitle()](#gettitle-string)
- [getAuthor()](#getauthor-string)
- [getContent()](#getcontent-string)
- [getSummary()](#getsummary-string)
- [getLastEditDate()](#getlasteditdate-date)
- [getPublishDate()](#getpublishdate-date)
- [getLink()](#getlink-string)

## STAY ON
StayOn class offers useful methods to handle feed list:

### **getFeeds(): Feed[]**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns feeds list

### **getFeedsByTitle(title: string): Feed[]**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns feeds which matches with give `title`

### **async addFeed(feedUrl: string): Promise<Feed[]> | never**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Add a feed with given `feedUrl`:
  - if the feed is valid, it's added to feed list which is then Returnsed
  - if the feed is invalid, an exception is thrown

### **async addFeeds(feedsUrl: string[]): Promise<Feed[]> | never**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Add all given feeds `feedsUrl`:
  - if the feed list is valid, it's added to feed list which is then Returnsed
  - if the feed list is invalid, an exception is thrown


### **removeFeedByTitle(title: string): Feed[]**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Removes the feed with given `title`:
  - if the feed is found, it's removed from the list which is then Returnsed
  - if the feed is not found, nothing happen and the list is Returnsed

### **stringify(): string**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns currend feed list in a stringified form

### **static async buildFromString(stringifiedStayOn: string): Promise<StayOn>**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Builds and returns a feed list from given `stringifiedStayOn`

## FEED
Feed class represents a single feed, and provides useful methods to interact with it:

###  **constructor(url: string)**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Builds a Feed object with given url

### **getTitle(): string**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns feed's title

### **getInfo(): object**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns a JSON object which contains all feed's information

### **getArticles(): Article[]**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns all feed's article

### **getArticlesByTitle(title: string): Article[]**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns all feeds articles which matches the `title`

### **getLatestArticles(): Article**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns last updated article

### **async parseFeed(): Promise<void | unknown> | never**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Parses the current feed to retrieve its information. Could throw an error if something wrong happens during parsing process

### **stingifyFeed(): string**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns feed's information in a stringified form

### **async validateFeed(url: string): Promise| never**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Validates given url. An error is thrown if given url is not valid


## FEED ERROR
FeedError class represents custom error for Feed

### **constructor(message: string, feed: string)**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Builds a custom error with given `message` for `feed`.

### **toString(): string**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns a custom error

## ARTICLE
Article is a class which represents a single article, and offers several methods to interact with it:

### **getTitle(): string**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns article's title

### **getAuthor(): string**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns article's author

### **getContent(): string**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns article's content

### **getSummary(): string**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns article's summary

### **getLastEditDate(): Date**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns the last date it was updated the article

### **getPublishDate(): Date**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns the publish date of the article

### **getLink(): string**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Returns article's link

# CONTRIBUTION
If you want to report a bug, request a new feature, or contribute, please open an [issue](https://github.com/longo-andrea/stay-on/issues).

# LICENCE
The MIT License (MIT)

Copyright (c) 2015 Filipe Deschamps

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
