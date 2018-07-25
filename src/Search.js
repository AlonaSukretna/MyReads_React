import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

class Search extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        books: props.books,
        foundBooks: props.foundBooks,
        search: ''
      };

      this.changeShelf = this.changeShelf.bind(this);
      this.changeSearch = this.changeSearch.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      books: props.books,
      foundBooks: props.foundBooks,
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
          foundBooks: result.error !== undefined ? [] : result,
          search: query
        });

        console.log(result);
      }, (err) => {
        console.log(err);
      });
    }
    else {
      this.setState({
        foundBooks: [],
        search: query
      });
    }
  }

  render() {

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
            <Shelf books={this.state.books}
                   booksOnShelf={this.state.foundBooks}
                   onChangeShelf={this.changeShelf} />
          </ol>
        </div>
      </div>
		);
	}

}

export default Search
