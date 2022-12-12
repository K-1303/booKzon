import React from 'react'
import { useGlobalContext } from '../context'

const About = () => {
  const [cookies] = useGlobalContext();
  
  return (
    <section className='section about-section'>
      <h1 className='section-title'>about us</h1>
      {cookies.user && <p>{cookies.user}</p>}
    </section>
  )
}

export default About
