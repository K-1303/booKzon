import React from 'react'
import { useGlobalContext } from '../context'
export default function SearchForm() {
  const { setSearchTerm } = useGlobalContext()
  const searchValue = React.useRef('k')

  React.useEffect(() => {
    searchValue.current.focus()
  }, [])

  function searchCocktail() {
    setSearchTerm((searchValue.current).value)
  }
  function handleSubmit(e) {
    e.preventDefault()
  }
  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>search your favorite books</label>
          <input
            type='text'
            name='name'
            id='name'
            ref={searchValue}
          />
          <button type='button' className='btn btn-primary btn-search' onClick={searchCocktail}>search</button>
        </div>
      </form>
    </section>
  )
}