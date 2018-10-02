import React from 'react'
import PropTypes from 'prop-types'
import BookshelfBooks from './BookshelfBooks'

class ListBooks extends React.Component {
	static propTypes = {
		allBooks: PropTypes.array.isRequired,
		onMoveBook: PropTypes.func.isRequired,
	    onPageSetting: PropTypes.func.isRequired
	}

	render() {
		const { allBooks, onMoveBook } = this.props

		return (
		<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
		            <BookshelfBooks allBooks={ allBooks } bookshelfTitle= 'currentlyReading' onMoveBook={ onMoveBook } />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                    <BookshelfBooks allBooks={ allBooks } bookshelfTitle= 'wantToRead' onMoveBook={ onMoveBook } />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                    <BookshelfBooks allBooks={ allBooks } bookshelfTitle= 'read' onMoveBook={ onMoveBook } />
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.props.onPageSetting(true)}>Add a book</a>
            </div>
          </div>
		)
	}
}

export default ListBooks