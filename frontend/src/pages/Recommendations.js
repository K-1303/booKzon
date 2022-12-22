import React from 'react'
import Book from './Book'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const About = () => {
  const {recBooks, recLoading} = useGlobalContext();

  if(recLoading) {
    return (
      <div>
        <Loading />
        <div className='cocktail-footer'><h3>Creating  Recommendations.....</h3></div>
      </div>
    )
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
