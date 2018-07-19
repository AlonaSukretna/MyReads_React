import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from "react-router-dom";
import Shelf from "./Shelf";
import Search from "./Search";
import Book from "./Book";
import update from 'immutability-helper'

var mybooks = [
  {
    title: "To Kill a Mockingbird",
    authors: "Harper Lee",
    cover: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
    shelf: "CurrentlyReading"
  },
  {
    title: "Ender's Game",
    authors: "Orson Scott Card",
    cover: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
    shelf: "CurrentlyReading"
  },
  {
    title: "1776",
    authors: "David McCullough",
    cover: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
    shelf: "WantToRead"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    authors: "J.K. Rowling",
    cover: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
    shelf: "WantToRead"
  },
  {
    title: "The Hobbit",
    authors: "J.R.R. Tolkien",
    cover: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
    shelf: "Read"
  },
  {
    title: "Oh, the Places You'll Go!",
    authors: "Seuss",
    cover: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
    shelf: "Read"
  },
  {
    title: "The Adventures of Tom Sawyer",
    authors: "Mark Twain",
    cover: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
    shelf: "Read"
  }
];

class BooksApp extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        books: [],
        booksCurrentlyReading: [],
        booksWantToRead: [],
        booksRead: [],
        search: ''
      }

      this.changeShelf = this.changeShelf.bind(this);
      //this.changeSearch = this.changeSearch.bind(this);
  }

  changeShelf(id, authors, cover, newshelf) {
    let bookIndex = this.state.books.findIndex(book => book.title === id);
    let updatedBooks = update(this.state.books, {
      $splice: [[bookIndex, 1, {title: id,
                                authors: authors,
                                cover: cover,
                                shelf: newshelf}]]
    });

    var booksCurrentlyReading = updatedBooks.filter(book => book.shelf === "CurrentlyReading");
    var booksWantToRead = updatedBooks.filter(book => book.shelf === "WantToRead");
    var booksRead = updatedBooks.filter(book => book.shelf === "Read");

    this.setState({
      books: updatedBooks,
      booksCurrentlyReading: booksCurrentlyReading,
      booksWantToRead: booksWantToRead,
      booksRead: booksRead
    });
  }

  /*
  changeSearch(event) {
    this.setState({
      search: event.target.value
    });
  }
  */

  componentWillMount() {

    var booksCurrentlyReading = mybooks.filter(book => book.shelf === "CurrentlyReading");
    var booksWantToRead = mybooks.filter(book => book.shelf === "WantToRead");
    var booksRead = mybooks.filter(book => book.shelf === "Read");

    //console.log(booksCurrentlyReading);
    //console.log(booksWantToRead);
    //console.log(booksRead);

    this.setState({
      books: mybooks,
      booksCurrentlyReading: booksCurrentlyReading,
      booksWantToRead: booksWantToRead,
      booksRead: booksRead
    });
  }

  render() {

    return (
      <div className="app">
      <Route exact path='/' render={()=>(
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <Shelf booksOnShelf={this.state.booksCurrentlyReading}
                           onChangeShelf={this.changeShelf} />
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <Shelf booksOnShelf={this.state.booksWantToRead}
                           onChangeShelf={this.changeShelf} />
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <Shelf booksOnShelf={this.state.booksRead}
                           onChangeShelf={this.changeShelf} />
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
      )}
      />
      <Route path='/search' render={({history})=>(
        <Search books={this.state.books}
                onChangeShelf={this.changeShelf} />
      )}
      />
      </div>
    )
  }
}

export default BooksApp
