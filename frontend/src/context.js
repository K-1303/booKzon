import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import {useCookies} from "react-cookie"

const url = 'http://127.0.0.1:8000/api/'
const AppContext = React.createContext()
let books_id = ["4408", "31147619", "29983711", "9401317"]

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('machine learning');
  const [books, setBooks] = useState([]);
  const [cookies, setCookies] = useCookies(["user", books_id])

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json();
      if(data) {
        const newBooks = data.map((item)=>{
          const{id, title, url, cover_image} = item;
          return {id:id, name:title, url:url, image:cover_image};
        })
        setCookies("user", (books_id ,data[0].book_id , data[1].book_id), {path: "/", maxAge: 31536000});
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
      loading, books, searchTerm, setSearchTerm, cookies
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
