import './css/App.css'

import DocumentStatus from './components/general/DocumentStatuses'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
function App() {

  return (
    <>
    <BrowserRouter>
          <Routes>
            <Route path="/login" element={<SignIn />} />
          </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
