import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import Book from './Book'
import { useGlobalContext } from '../context'

const url = 'http://127.0.0.1:8000/api/rec/'

const About = () => {
  const [books, setBooks] = useState([]);
  const [cookies, setLoading] = useGlobalContext();
  const fetchBooks = useCallback(async () => {
    try {
      const response = await fetch(`${url}${cookies.user[0]}`)
      const data = await response.json();
      if(data) {
        const newBooks = data.map((item)=>{
          const{id, title, url, cover_image} = item;
          return {id:id, name:title, url:url, image:cover_image};
        })
        setBooks(newBooks)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [cookies.user])

  useEffect(() => {
    fetchBooks()
  }, [cookies.user, fetchBooks])
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

export default About
