import React from 'react'
import BooksList from '../components/BooksList'
import SearchForm from '../components/SearchForm'

const Home = () => {
  return (
    <main>
      <SearchForm />
      <BooksList />
    </main>
  )
}

export default Home
