import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    // Use allBooks to save books in bookshelf
    allBooks: [],
  }

  componentDidMount() {
    // Use BooksAPI.getAll() to extract books in bookshelf
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ allBooks: books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          // Showing books in shelves by component 'ListBook'
          <ListBooks allBooks={ this.state.allBooks } onPageSetting={ this.pageSetting }/>
        )}/>
        <Route path='/search' render={() => (
          // Showing search page by component 'SearchBooks'
          <SearchBooks onPageSetting={ this.pageSetting } allBooks={ this.state.allBooks }/>
        )}/>
      </div>
    )}}

export default BooksApp
