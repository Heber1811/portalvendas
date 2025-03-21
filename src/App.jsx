import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HouseDetail from './pages/HouseDetail'
import Home from './pages/Home'

function App() {
  return (
    <ChakraProvider resetCSS>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/casa/:id" element={<HouseDetail />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
