import React from 'react'

const Book = ({id, name, url, image }) => {

  if(name.length > 90) {
    name = name.substring(0, 87) + "...";
  }

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
