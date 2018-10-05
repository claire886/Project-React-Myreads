import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component {
	static propTypes = {
	    bookToList: PropTypes.array.isRequired,
	    currentShelf: PropTypes.string.isRequired,
	    idInShelf: PropTypes.array,
	    allBooks: PropTypes.array
	}

	// function for move books between shelves
  	moveBook = (book, shelf) => {
	    BooksAPI.update(book, shelf)
	    BooksAPI.getAll()
	      .then((books) => {
	        this.setState({ allBooks: books })
	    })
	  }

	render() {
		const moveBook = this.moveBook
		const idInShelf = this.props.idInShelf
	    const bookToList = this.props.bookToList
	    const allBooks = this.props.allBooks
	    let defaultShelf = this.props.currentShelf
	    // 'bookList' for saving HTML for <ol .book-grid>
	    let bookList = []

      	bookList = bookToList.map(function(book) {
	        // Use 'bookImage' for url link in case the book object doesn't have property for url link.
	        // If book has property of imageLinks, 'bookImage' is set to be book.imageLinks.thumbnail
	        const bookImage = (book.imageLinks) ? (book.imageLinks.thumbnail) : ('')
	        const bookAuthors = (book.authors) ? (book.authors.join(', ')) : ('')
	        // If isInShelf is true, that means the request is from search page.
	        // Set default to be 'none' and then see if the book is already in bookshelf.
	        if (idInShelf) {
	        	defaultShelf = 'none'
		        if (idInShelf.indexOf(book.id) !== -1) {
		          const bookObject = allBooks.filter(bookChecked => bookChecked.id === book.id)
		          defaultShelf = bookObject[0].shelf
		        }
	        }
        
	        return (
	            <li key={book.id}>
	              <div className="book">
	                <div className="book-top">
	                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ bookImage })`}}></div>
	                  <div className="book-shelf-changer">
	                    <select defaultValue={defaultShelf} onChange={(e) => moveBook(book, e.target.value)}>
	                      <option value="move" disabled>Move to...</option>
	                      <option value="currentlyReading">Currently Reading</option>
	                      <option value="wantToRead">Want to Read</option>
	                      <option value="read">Read</option>
	                      <option value='none'>None</option>
	                    </select>
	                  </div>
	                </div>
	                <div className="book-title">{ book.title }</div>
	                <div className="book-authors">{ bookAuthors }</div>
	              </div>
	            </li>
	        )
	    })

		return (
			<ol className="books-grid">	
				{ bookList }
			</ol>
		)
	}
}

export default Book