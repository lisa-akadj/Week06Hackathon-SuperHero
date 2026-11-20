import {Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Hero from './pages/Hero'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hero/:id" element={<Hero />} />
      <Route path="*" element={<h1>I didn't code for that path, please only use "/" and "/hero/:id". Dunjee</h1>} />
    </Routes>
  )
}

export default App