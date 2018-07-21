import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from "react-router-dom";
import Shelf from "./Shelf";

class Search extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        books: props.books,
        search: ''
      };

      this.changeShelf = this.changeShelf.bind(this);
      this.changeSearch = this.changeSearch.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      books: props.books,
      search: ''
    });
  }

  changeShelf(id, title, authors, cover, newshelf)
  {
    this.props.onChangeShelf(id, title, authors, cover, newshelf);
  }

  changeSearch(event) {

    var query = event.target.value;

    if (query !== '') {
      BooksAPI.search(query).then((result) => {

        this.setState({
          books: result.error !== undefined ? [] : result,
          search: query
        });

        console.log(result);
      }, (err) => {
        console.log(err);
      });
    }
    else {
      this.setState({
        books: [],
        search: query
      });
    }
  }

  render() {

    /*
    var query = this.state.search;
    var booksFound = []

    if (query !== '') {
      booksFound = this.state.books.filter((book) => book.title.toLowerCase().search(query.toLowerCase()) !== -1 ||
      book.authors.join(', ').toLowerCase().search(query.toLowerCase()) !== -1);
    }
    */

		return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.search} onChange={this.changeSearch} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Shelf booksOnShelf={this.state.books}
                   onChangeShelf={this.changeShelf} />
          </ol>
        </div>
      </div>
		);
	}

}

export default Search
