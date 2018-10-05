import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


class BookshelfBooks extends React.Component {
	static propTypes = {
		// 'bookshelfTitle' for identifying bookshelf
		bookshelfTitle: PropTypes.string.isRequired,
		allBooks: PropTypes.array.isRequired,
	}

	render() {
		const bookshelfTitle = this.props.bookshelfTitle
		const allBooks = this.props.allBooks
		// Filtering books according to bookshelf(bookshelfTitile)
		// so that the correct shelf is selected in select options
		const bookToList = this.props.allBooks.filter(book => (book.shelf === bookshelfTitle))

		return (
			<div className="bookshelf-books">
	        	<Book allBooks={ allBooks } bookToList={ bookToList } currentShelf={ this.props.bookshelfTitle } />
	    	</div>
		)
	}
}

export default BookshelfBooks