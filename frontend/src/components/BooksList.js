import React from 'react'
import Book from './Book'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const BooksList = () => {
  const {books, loading} = useGlobalContext();

  if(loading) {
    return <Loading />
  }

  if(books.length < 1) {
    <h2 className='section-list'>
      no books matched your search criteria
    </h2>
  }
  return (
    <section className='section'>
      <div className='cocktails-center'>
        {books.map((item)=>{
          return <Book key={item.id} {...item}/>
        })}
      </div>
    </section>
  )
}

export default BooksList
