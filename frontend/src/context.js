import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'http://127.0.0.1:8000/api/'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('machine learning');
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json();
      if(data) {
        const newBooks = data.map((item)=>{
          const{id, title, url, cover_image} = item;
          return {id:id, name:title, url:url, image:cover_image}
        })
        setBooks(newBooks)
      }
      else {
        setBooks([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    fetchBooks()
  }, [searchTerm, fetchBooks])
  return (
    <AppContext.Provider value={{
      loading, books, searchTerm, setSearchTerm
    }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
