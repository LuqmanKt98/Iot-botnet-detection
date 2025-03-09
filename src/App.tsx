import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import UploadComponent from './components/UploadComponent'
import ResultsComponent from './components/ResultsComponent'
import { Container } from 'react-bootstrap'

// Application states
enum AppState {
  HOME,
  UPLOAD,
  RESULTS
}

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.HOME)
  const [fileName, setFileName] = useState<string>('')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

  // Scroll to top helper function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Scroll to top on initial load
  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);

  // Watch for state changes and scroll to top
  useEffect(() => {
    scrollToTop();
  }, [appState, scrollToTop]);

  // Set dark mode on initial load and when it changes
  useEffect(() => {
    const setDarkModeClass = () => {
      if (isDarkMode) {
        document.body.classList.add('dark-mode')
        document.documentElement.style.colorScheme = 'dark'
      } else {
        document.body.classList.remove('dark-mode')
        document.documentElement.style.colorScheme = 'light'
      }
    }
    
    setDarkModeClass()
    
    // Optional: Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode.toString())
  }, [isDarkMode])
  
  // Load dark mode preference from localStorage on initial render
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true')
    } else {
      // Default to user's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  // Handle file upload completion
  const handleFileProcessed = (name: string) => {
    setFileName(name)
    setAppState(AppState.RESULTS)
  }

  // Reset to upload screen
  const handleReset = () => {
    setAppState(AppState.UPLOAD)
  }

  // Start upload process from home
  const handleStartUpload = () => {
    setAppState(AppState.UPLOAD)
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow-1 position-relative overflow-hidden">
        <AnimatePresence mode="wait">
          {appState === AppState.HOME && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage onStartUpload={handleStartUpload} />
            </motion.div>
          )}
          
          {appState === AppState.UPLOAD && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="py-5"
            >
              <Container>
                <UploadComponent onFileProcessed={handleFileProcessed} />
              </Container>
            </motion.div>
          )}
          
          {appState === AppState.RESULTS && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="py-5"
            >
              <Container>
                <ResultsComponent fileName={fileName} onReset={handleReset} />
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
}

export default App
