import React from 'react'
import NavBar from './NavBar'
import RoutesList from './RoutesList'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <RoutesList></RoutesList>
    </BrowserRouter>
  )
}

export default App
