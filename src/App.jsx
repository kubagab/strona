import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ContactPage from './pages/ContactPage'
import TermsPage from './pages/TermsPage'
import BlogPage from './pages/BlogPage'
import ArticlePage from './pages/ArticlePage'
import NewsletterPopup from './components/NewsletterPopup'
import { CartProvider } from './context/CartContext'

function App() {
  return (
      <CartProvider>
        <Router>
          <NewsletterPopup />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kawa/:kategoria" element={<CategoryPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/regulamin" element={<TermsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<ArticlePage />} />
          </Routes>
        </Router>
      </CartProvider>
  )
}

export default App
