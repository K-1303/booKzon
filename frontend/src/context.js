import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import {useCookies} from "react-cookie"
import {v4 as uuid} from 'uuid'

const url = 'http://127.0.0.1:8000/api/'
const AppContext = React.createContext()
const user_id = uuid().slice(0, 8);
let books_id = [user_id, "213030", "25545994", "18859629", "148020", "15844113", "25030367", "475675", "2214140"]

const AppProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('machine learning');
  const [books, setBooks] = useState([]);
  const [recBooks, setRecBooks] = useState([]);
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
        if (cookies.user && searchTerm != 'machine learning') {
          if((cookies.user).length < 17){
            books_id = cookies.user
            books_id = [...books_id ,data[0].book_id, data[1].book_id, data[2].book_id, data[3].book_id]
            setCookies("user", [...books_id], {path: "/", maxAge: 31536000});
          }
          else {
            if((cookies.user).length == 17) {
              books_id = [...books_id, "1"]
            }

            books_id = cookies.user

            if (parseInt(books_id[17]) < (((cookies.user).length) - 1)) {
              books_id[parseInt(books_id[17])] = data[0].book_id
              books_id[parseInt(books_id[17]) + 1] = data[1].book_id
              books_id[parseInt(books_id[17]) + 2] = data[2].book_id
              books_id[parseInt(books_id[17]) + 3] = data[3].book_id
              books_id[17] = parseInt(books_id[17]) + 4
            }
            else {
              books_id[17] = "1"
              books_id[parseInt(books_id[17])] = data[0].book_id
              books_id[parseInt(books_id[17]) + 1] = data[1].book_id
              books_id[parseInt(books_id[17]) + 2] = data[2].book_id
              books_id[parseInt(books_id[17]) + 3] = data[3].book_id
              books_id[17] = parseInt(books_id[17]) + 4
            }

            setCookies("user", [...books_id], {path: "/", maxAge: 31536000});
          }
        }
        else if(!cookies.user) {
          setCookies("user", [...books_id], {path: "/", maxAge: 31536000});
        }
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
    fetchRecBooks()
  }, [searchTerm, fetchBooks])

  const fetchRecBooks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${'user/rec'}`)
      const data = await response.json();
      if(data) {
        const newBooks = data.map((item)=>{
          const{id, title, url, cover_image} = item;
          return {id:id, name:title, url:url, image:cover_image};
        })
        setRecBooks(newBooks)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm])

  return (
    <AppContext.Provider value={{
      loading, books, recBooks, searchTerm, setSearchTerm, cookies
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
