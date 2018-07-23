import React from 'react'
import './App.css'
import Book from "./Book";

class Shelf extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        name: props.name,
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
      name: props.name,
      booksOnShelf: props.booksOnShelf
    });
  }

  render() {

    if (this.state.booksOnShelf === undefined || this.state.booksOnShelf.length === 0) {
      return <span>No books found</span>;
    }

		return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.state.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.booksOnShelf.map((book, index) =>
             <li key={index}>
               <Book key={book.id}
                     id={book.id}
                     title={book.title}
                     authors={book.authors !== undefined ? book.authors : ''}
                     cover={book.imageLinks !== undefined ? book.imageLinks.thumbnail : ''}
                     shelf={book.shelf !== undefined ? book.shelf : 'none'}
                     onChangeShelf={this.changeShelf} />
             </li>
      		)}
          </ol>
        </div>
      </div>
    );
	}

}

export default Shelf
