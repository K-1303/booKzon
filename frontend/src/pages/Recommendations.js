import React from 'react'
import Book from './Book'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const About = () => {
  const {recBooks, recLoading} = useGlobalContext();

  if(recLoading) {
    return (
      <div>
        <div className='section'>
          <h2 className='recommendations-heading'>Creating  Recommendations.....</h2></div>
          <Loading />
      </div>
    )
  }

  return (
    <section className='section'>
      <h2 className='recommendations-heading'>Recommendations</h2>
      <div className='cocktails-center'>
        {recBooks.map((item)=>{
          return <Book key={item.id} {...item}/>
        })}
      </div>
    </section>
  )
}

export default About
