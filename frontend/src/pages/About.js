import React from 'react'
import Book from './Book'
import { useGlobalContext } from '../context'

const About = () => {
  const {recBooks, loading} = useGlobalContext();
  return (
    <section className='section'>
      <div className='cocktails-center'>
        {recBooks.map((item)=>{
          return <Book key={item.id} {...item}/>
        })}
      </div>
    </section>
  )
}

export default About
