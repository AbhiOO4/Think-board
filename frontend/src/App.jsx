import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import NoteCreate from './pages/NoteCreate'
import NoteDetail from './pages/NoteDetail'


const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/create' element={<NoteCreate />}></Route>
        <Route path='/note/:id' element={<NoteDetail />}></Route>
      </Routes>
    </div>
  )
}

export default App
