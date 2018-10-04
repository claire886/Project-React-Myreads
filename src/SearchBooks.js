import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class SearchBooks extends React.Component {

  static propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    allBooks: PropTypes.array.isRequired
}

  state = {
    // use 'resultBooks' for search result data
    resultBooks: [],
    query: ''
  }

  // Use BooksAPI.search to search books
  // Save search result in 'resultBooks' according to query
  searchResult = (query) => {
    this.setState({query: query})
    if (query) {
      BooksAPI.search(query)
      .then((result) => {
        this.setState({resultBooks: result})
      })
      .catch((err) => {
        console.log('noResult', this.state.resultBooks)
    })}
  }

  render() {
    const moveToShelf = this.props.onMoveBook
    const allBooks = this.props.allBooks
    // Generating an array of book id for books in bookshelf.
    // It can be used to select correct shelf in select options
    let idInShelf = this.props.allBooks.map(book => book.id)
    // 'bookList' for saving HTML for <ol .book-grid>
    let bookList = []
    // If both book query and search result are not empty,
    // book-grid will be built according rearch result by map method
    if (this.state.query && this.state.resultBooks.length > 0) {
      bookList = this.state.resultBooks.map(function(book) {
        let defaultShelf ='none'
        // Use 'bookImage' for url link in case the book object doesn't have property for url link.
        let bookImage = ''
        
        // Check if book is already in bookshelf.
        // If the book can be found in bookshelf, using filter method to look for its bookshelf.
        // The select options will be assigned according to bookshelf.
        if (idInShelf.indexOf(book.id) !== -1) {
          const bookObject = allBooks.filter(bookChecked => bookChecked.id === book.id)
          defaultShelf = bookObject[0].shelf
        }
        // If book has property of imageLinks, 'bookImage' is set to be book.imageLinks.thumbnail
        if (book.hasOwnProperty('imageLinks')) {
          bookImage = book.imageLinks.thumbnail
        }
        return (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ bookImage })`}}></div>
                  <div className="book-shelf-changer">
                    <select defaultValue={defaultShelf} onChange={(e) => moveToShelf(book, e.target.value)}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value='none'>None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{ book.title }</div>
                <div className="book-authors">{ book.authors }</div>
              </div>
            </li>
        )
      })
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              onChange={(e) => this.searchResult(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          { bookList }
          </ol>
        </div>
      </div>
    )
  }  
}

export default SearchBooks