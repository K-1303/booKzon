import React from 'react'
import { Link } from 'react-router-dom'

const Book = ({id, name, url, image }) => {
  return (
    <article className='cocktail'>
      <div className='img-container'>
        <img src={image} alt={name} />
      </div>
      <div className='cocktail-footer'>
        <h3>{name}</h3>
        <a href={url} className='btn btn-primary btn-details'>Details</a>
      </div>
    </article>
  )
}

export default Book
