import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import OurStoryPage from './pages/OurStoryPage'
import ReasonsPage from './pages/ReasonsPage'
import SecretLetterPage from './pages/SecretLetterPage'
import GalleryPage from './pages/GalleryPage'
import CountdownPage from './pages/CountdownPage'
import AdminPage from './pages/AdminPage'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/story" element={<OurStoryPage />} />
          <Route path="/reasons" element={<ReasonsPage />} />
          <Route path="/letter" element={<SecretLetterPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AnimatePresence>
      {location.pathname !== '/' && <Footer />}
    </div>
  )
}

export default App
