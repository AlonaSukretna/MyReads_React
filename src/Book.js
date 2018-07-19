import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from "react-router-dom";

class Book extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        title: props.title,
        authors: props.authors,
        cover: props.cover,
        shelf: props.shelf
      };

      this.change = this.change.bind(this);
      this.changeShelf = this.changeShelf.bind(this);
  }

  changeShelf(id, authors, cover, newshelf) {
    this.props.onChangeShelf(id, authors, cover, newshelf);
  }

  componentWillReceiveProps(props) {
    this.setState({
      title: props.title,
      authors: props.authors,
      cover: props.cover,
      shelf: props.shelf
    });
  }

  change(event){
    //console.log(event.target.value);
    this.setState({
      shelf: event.target.value
    });

    this.changeShelf(this.state.title,
                     this.state.authors,
                     this.state.cover,
                     event.target.value);
  }

  render() {
		return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:
            `url(${this.state.cover})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.change} value={this.state.shelf}>
              <option value="Move" disabled>Move to...</option>
              <option value="CurrentlyReading">Currently Reading</option>
              <option value="WantToRead">Want to Read</option>
              <option value="Read">Read</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.state.title}</div>
        <div className="book-authors">{this.state.authors}</div>
      </div>
		);
	}

}

export default Book
