import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from "react-router-dom";
import Book from "./Book";

class Shelf extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        booksOnShelf: props.booksOnShelf
      };

      this.changeShelf = this.changeShelf.bind(this);
  }

  changeShelf(id, authors, cover, newshelf)
  {
    this.props.onChangeShelf(id, authors, cover, newshelf);
  }

  componentWillReceiveProps(props) {
    this.setState({
      booksOnShelf: props.booksOnShelf
    });
  }

  render() {
		return (
        this.state.booksOnShelf.map((book) =>
         <li>
           <Book key={book.title}
                 title={book.title}
                 authors={book.authors}
                 cover={book.cover}
                 shelf={book.shelf}
                 onChangeShelf={this.changeShelf} />
         </li>
  		)
    );
	}

}

export default Shelf
