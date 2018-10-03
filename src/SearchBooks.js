import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {

  static propTypes = {
    onPageSetting: PropTypes.func.isRequired,
    onMoveBook: PropTypes.func.isRequired,
    allBooks: PropTypes.array.isRequired
}

  state = {
    resultBooks: [],
    query: ''
  }

  searchResult = (query) => {
    this.setState({query: query.trim()})

    if (query) {
      BooksAPI.search(query)
      .then((result) => {
        this.setState({resultBooks: result})
console.log('queryResult', this.state.resultBooks)
      })
      .catch((err) => {
        console.log('noResult', this.state.resultBooks)
    })}
  }

  moveToShelf = (book, targetValue) => {
console.log('targetValue', targetValue, book)
    this.props.onMoveBook(book, targetValue)
  }

  render() {
    const moveToShelf = this.moveToShelf
    const allBooks = this.props.allBooks
    let idInShelf = this.props.allBooks.map(book => book.id)
    let bookList = []
    
    if (this.state.query && this.state.resultBooks.length > 0) {
      bookList = this.state.resultBooks.map(function(book) {
        let defaultShelf ='none'
        let bookImage = ''
    
        if (idInShelf.indexOf(book.id) !== -1) {
console.log('found book', book)
          const bookObject = allBooks.filter(bookChecked => bookChecked.id === book.id)
          defaultShelf = bookObject[0].shelf
console.log('bookObject', bookObject)
        }

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
          <a className="close-search" onClick={() => this.props.onPageSetting(false)}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"
               value={this.state.query} onChange={(e) => this.searchResult(e.target.value)}
            />

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