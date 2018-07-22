import React from 'react'
import './App.css'
import Book from "./Book";

class Shelf extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        booksOnShelf: props.booksOnShelf
      };

      this.changeShelf = this.changeShelf.bind(this);
  }

  changeShelf(id, title, authors, cover, newshelf)
  {
    this.props.onChangeShelf(id, title, authors, cover, newshelf);
  }

  componentWillReceiveProps(props) {
    this.setState({
      booksOnShelf: props.booksOnShelf
    });
  }

  render() {

    if (this.state.booksOnShelf === undefined || this.state.booksOnShelf.length === 0) {
      return <span>No books found</span>;
    }

		return (
        this.state.booksOnShelf.map((book) =>
         <li>
           <Book key={book.id}
                 id={book.id}
                 title={book.title}
                 authors={book.authors !== undefined ? book.authors : ''}
                 cover={book.imageLinks !== undefined ? book.imageLinks.thumbnail : ''}
                 shelf={book.shelf !== undefined ? book.shelf : 'none'}
                 onChangeShelf={this.changeShelf} />
         </li>
  		)
    );
	}

}

export default Shelf
