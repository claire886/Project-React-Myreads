import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends React.Component {

  static propTypes = {
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
    const allBooks = this.props.allBooks
    const bookToList = this.state.resultBooks
    // Generating an array of book id for books in bookshelf.
    // It can be used to select correct shelf in select options
    let idInShelf = this.props.allBooks.map(book => book.id)
    
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
          {(this.state.query && this.state.resultBooks.length > 0) ? (
            <Book bookToList={ bookToList } currentShelf='none' idInShelf={ idInShelf } allBooks={ allBooks } />
            ) : (
            <div></div>
            )}
        </div>
      </div>
    )
  }  
}

export default SearchBooks