// import React, { useState } from 'react'
import Contacts from './Components/Contacts'
import CreateContact from './Components/CreateContact'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditContact from './Components/EditContact'
import Contact from './Components/Contact'

const App = () => {

  return (
    <div style={{ padding: '20px' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Contacts></Contacts>}> </Route>
          <Route path='/createcontact' element={<CreateContact></CreateContact>}></Route>
          <Route path='/edit/:id' element={<EditContact></EditContact>}></Route>
          <Route path='/contact/:id' element={<Contact></Contact>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App