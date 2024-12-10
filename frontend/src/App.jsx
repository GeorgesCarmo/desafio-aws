import { useState, useEffect } from 'react';
import axios from 'axios'
import { AddButton, Container, ContainerForm, Books, Title, TrashButton } from './style';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

function App() {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    getBooks()
  }, [])

  function getBooks() {
    api.get('/book').then((res) => {
      console.log(res.data)
      setBooks(res.data)
    })
  }

/*  function getBookById(id) {
    api.get(`/book/${id}`).then( (res) => {
      console.log(res.data)
    })
    setBook({})
  }
*/
  function newBook() {
    api.post('/book', { title, author }).then((res) => {
      console.log(res)
    })
    setBook({})
    getBooks()
  }

/*  function updateBook() {
    api.put(`/book/${book.id}`, { title, author }).then((res) => {
      console.log(res);
      getBooks()
    })
    setBook(res)
  }
*/  
  function excluirBook(id){
    api.delete(`/book/${id}`).then( (res) => {
      console.log(res)
      getBooks()
    })
  }

  function rederizarBooks() {
    return (
      <Container>
        <h1>Livros 📚</h1>
          {books.map(book => (
            <Books key={book.id}>
              <p>Título: {book.title} - Autor: {book.author}</p>
              <TrashButton
                onClick={() => excluirBook(book.id)}
                className="bg-red-500 p-2 rounded-md">🗑️
              </TrashButton>
                </Books>
          ))}
      </Container>
    )
  }

  function rederizarFormBooks() {
    return (
      <ContainerForm>
          <h1>Adicionar novo Livro 📖</h1>
          <input type="text" placeholder='Título' value={title ?? ''} onChange={(event) => setTitle(event.target.value)} />
          <input type="text" placeholder='Autor' value={author ?? ''} onChange={(event) => setAuthor(event.target.value)} />
          <AddButton onClick={newBook}>Adicionar Livro</AddButton>
      </ContainerForm>
    )}

  return (
    <Title>
      <h1>Gerador de Fila SQS</h1>
      {rederizarFormBooks()}
      {rederizarBooks()}
    </Title>
  )
}

export default App
