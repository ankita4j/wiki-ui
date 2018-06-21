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

 


