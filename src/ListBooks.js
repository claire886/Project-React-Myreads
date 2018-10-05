import React from 'react'
import PropTypes from 'prop-types'
import BookshelfBooks from './BookshelfBooks'
import { Link } from 'react-router-dom'

class ListBooks extends React.Component {
	static propTypes = {
		allBooks: PropTypes.array.isRequired,
	}

	render() {
		const { allBooks } = this.props
  
        // use component 'BookshelfBooks' to build book list for each bookshelf
        // use property 'bookshelfTitle' to idenfity bookshelf 
		return (
		    <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div className="bookshelf">
                  	<h2 className="bookshelf-title">Currently Reading</h2> 
		            <BookshelfBooks allBooks={ allBooks } bookshelfTitle= 'currentlyReading' />
                </div>
                <div className="bookshelf">
                  	<h2 className="bookshelf-title">Want to Read</h2>
                    <BookshelfBooks allBooks={ allBooks } bookshelfTitle= 'wantToRead' />
                </div>
                <div className="bookshelf">
                  	<h2 className="bookshelf-title">Read</h2>
                    <BookshelfBooks allBooks={ allBooks } bookshelfTitle= 'read' />
                </div>
            </div>
            <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
        </div>
		)
	}
}

export default ListBooks