import React from 'react'
import PropTypes from 'prop-types'

class BookshelfBooks extends React.Component {
	static propTypes = {
		bookshelfTitle: PropTypes.string.isRequired,
		allBooks: PropTypes.array.isRequired,
		onMoveBook: PropTypes.func.isRequired
	}

	moveToShelf(book, targetValue) {
		console.log('targetValue', targetValue, book)
		this.props.onMoveBook(book, targetValue)
	}

	render() {
		const bookshelfTitle = this.props.bookshelfTitle
		const allBooks = this.props.allBooks.filter(book => (book.shelf === bookshelfTitle))

		return (
			<div className="bookshelf-books">
	        <ol className="books-grid">
	        {allBooks.map(book => (
	        	<li key={book.id} onChange={ (e) => this.moveToShelf(book, e.target.value) }>
	            <div className="book">
	              <div className="book-top">
	                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ book.imageLinks.smallThumbnail })` }}></div>
	                <div className="book-shelf-changer">
	                  <select defaultValue={ bookshelfTitle } >
	                    <option value="move" disabled>Move to...</option>
	                    <option value="currentlyReading">Currently Reading</option>
	                    <option value="wantToRead">Want to Read</option>
	                    <option value="read">Read</option>
	                  </select>
	                </div>
	              </div>
	              <div className="book-title">{ book.title }</div>
	              <div className="book-authors">{ book.authors }</div>
	            </div>
	          </li>
	        ))}
	        </ol>
	    </div>
		)
	}
}

export default BookshelfBooks