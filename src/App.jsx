import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Layout } from './components/Layout.jsx'
import { ProductsPage } from './pages/ProductsPage.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ProductsAllPage } from './pages/ProductsAllPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignupPage } from './pages/SignupPage.jsx'
import { ProductOverviewPage } from './pages/ProductOverviewPage.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/products" element={<ProductsAllPage />} />
            <Route path="/product/:id" element={<ProductOverviewPage />} />
            <Route path="/category/:category" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
