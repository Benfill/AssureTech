import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Clients from './components/clients/Clients'

function App() {

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Clients />} />
          <Route path='/*' element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
