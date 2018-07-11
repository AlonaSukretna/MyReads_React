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
  }

  componentWillReceiveProps(props) {
    this.setState({
      title: props.title,
      authors: props.authors,
      cover: props.cover,
      shelf: props.shelf
    });
  }

  render() {
		return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:
            `url(${this.state.cover})` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
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
