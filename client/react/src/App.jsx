import { Routes, Route, Link } from 'react-router'
import './App.css'
import Contacts from './pages/Contacts'

function Home() {
  return (
    <div style={{padding: 20}}>
      <h2>Welcome</h2>
      <p>This project contains a demo of server-side pagination. Open the <Link to="/contacts">Contacts</Link> page to try pagination with URL search params.</p>
    </div>
  )
}

function App(){
  return (
    <div>
      <header className="app-header">
        <h1>Pagination demo — React client</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/contacts">Contacts</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/contacts" element={<Contacts/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
