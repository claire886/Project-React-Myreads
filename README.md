# MyReads Project

This is a project for Udacity's React Fundamentals course. A starter code(https://github.com/udacity/reactnd-project-myreads-starter) is provided with static template. I started from there to make it interactive by adding React code.

In main page, users can move books between three bookshelves: Currently Reading, Want to Read and Read. In search page, users can search for books and then add it into main page by selecting one of three bookshelves. Please note that the searched results are limited to a set of search terms. Please refer the Important section for further information.

## To use this app

* install all project dependencies with `npm install`
* start the server with `npm start`
* install 'react-router-dom' with 'npm install --save react-router-dom'


## Newly added files to starter code

Four React code files are added into src folder. These files are React component: ListBooks, BookShelfBooks, SearchBooks and Books. ListBooks, BookShelfBooks and Books are used for main page. SerachBooks and Books are used for search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
