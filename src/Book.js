import React from 'react'
import './App.css'

class Book extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        id: props.id,
        title: props.title,
        authors: props.authors,
        cover: props.cover,
        shelf: props.shelf
      };

      this.change = this.change.bind(this);
      this.changeShelf = this.changeShelf.bind(this);
  }

  changeShelf(id, title, authors, cover, newshelf) {
    this.props.onChangeShelf(id, title, authors, cover, newshelf);
  }

  componentWillReceiveProps(props) {
    this.setState({
      id: props.id,
      title: props.title,
      authors: props.authors,
      cover: props.cover,
      shelf: props.shelf
    });
  }

  change(event){
    this.setState({
      shelf: event.target.value
    });

    this.changeShelf(this.state.id,
                     this.state.title,
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
