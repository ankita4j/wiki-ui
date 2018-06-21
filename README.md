# wiki-ui

## Pre-Requisite
* install mongo db, run it on localhost:27017
* install nodejs

## Launch commands
```
git clone https://github.com/ankita4j/wiki-ui.git
cd wiki-ui
npm install
node api/dbLoader.js
npm start
```
Run the app on http://localhost:8000

## Architechture
### DB Model
Collection Page
* id - Page Id
* title - Wiki Title
* content - Markdown wiki content

Collection Bookmark
* id - Bookmark Id
* pageId - Page Id
* user - bookmark creator


### APIs
 * /api/page/:pageID - GET api to get page(wiki) content
 * /api/page/ - PUT api to Create a page(wiki).
 * /api/page/:pageID - PUT api to Update a page(wiki).
 * /api/bookmark/:pageID - PUT api to Create a bookmark for user "ankita"(hardcoded)
 * /api/bookmarks - GET api to get all bookmarks for user "ankita"(hardcoded)
 
## Technologies
* Mongo DB
* Node Js -  Express Server, Mongo client, markdown-it
* Angular JS


## Requirements
1. By definition a Wiki is, “A website on which users collaboratively modify content and
structure directly from the web browser” - supported
2. Underlying technology/language is up to you
3. Must support adding new pages - supported
4. Must support editing existing pages - supported
5. Pages should be “bookmark-able”, i.e. if I’m on a page and bookmark it, the bookmark
should link back to the page - supported

## Bonus Requirements
1. Allow pages to be written in Markdown - supported
2. Support uploading images to use in pages - not supported
3. Use a real-world database system - used Mongo DB
4. Some version control support i.e. revert a page to an older version - not supported
5. Implement an account system with “owned” pages where only the owner can edit said
page - not supported
6. Create an audit log that will show what changes have been made to what pages all in
one place - not supported

 


