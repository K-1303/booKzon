import React from 'react'
import Book from './Book'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const About = () => {
  const {recBooks, loading} = useGlobalContext();

  if(loading) {
    return <Loading />
  }

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
