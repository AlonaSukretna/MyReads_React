# MyReads Project

This app allows you to select and categorize books you have read,
are currently reading, or want to read.

# App Functionality
In this application, the main page displays a list of "shelves" (i.e. categories),
each of which contains a number of books. The three shelves are:

Currently Reading
Want to Read
Read

Each book has a control that lets you select the shelf for that book.
When you select a different shelf, the book moves there.
Note that the default value for the control should always be the current shelf
the book is in.

The main page also has a link to /search, a search page that allows you to find
books to add to your library.

The search page has a text input that may be used to find books. As the value of
the text input changes, the books that match that query are displayed on the page,
along with a control that lets you add the book to your library.

When a book is on a bookshelf, it should have the same state on both the main
application page and the search page.

The search page also has a link to / (the root URL), which leads back to the main page.

When you navigate back to the main page from the search page, you should instantly
see all of the selections you made on the search page in your library.

# How to install the application

Clone or download this git repository
$ git clone ...
Go into the application folder
$ cd ...
Install dependencies
$ npm install
Run the application
$ npm start
This will open a new browser tab with the application running.
