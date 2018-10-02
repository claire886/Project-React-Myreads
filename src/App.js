import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

BooksAPI.search('Art')
  .then((result) => {
    console.log('result', result)
  })

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ allBooks: books })
    })
  }

  pageSetting = (setting) => {
    this.setState({ showSearchPage: setting })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ allBooks: books })
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks onPageSetting={ this.pageSetting } />
        ) : (
          <div>
            <ListBooks allBooks={this.state.allBooks} onMoveBook={ this.moveBook } onPageSetting={ this.pageSetting } />
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
