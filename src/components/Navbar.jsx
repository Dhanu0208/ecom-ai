import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function PillLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `navPill ${isActive ? 'active' : ''}`}
    >
      {children}
    </NavLink>
  )
}

export function Navbar() {
  const { totalQty } = useCart()
  const { isAuthed, user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="navbar">
      <div className="container navInner">
        <button className="brand" onClick={() => navigate('/')}>
          NovaMart
        </button>

        <nav className="navLinks" aria-label="Categories">
          <PillLink to="/">Home</PillLink>
          <PillLink to="/products">Products</PillLink>
          <PillLink to="/category/men">Men</PillLink>
          <PillLink to="/category/women">Women</PillLink>
          <PillLink to="/category/kids">Kids</PillLink>
        </nav>

        <div className="navRight">
          <div className="navRightInner">
            {isAuthed ? (
              <div className="userPill" title={user?.email || ''}>
                <span className="userDot" />
                <span className="userName">{user?.name || 'Account'}</span>
                <button className="btn link" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="authLinks">
                <NavLink to="/login" className="navMini">
                  Login
                </NavLink>
                <NavLink to="/signup" className="btn primary navMiniBtn">
                  Sign up
                </NavLink>
              </div>
            )}

            <NavLink to="/cart" className="cartBtn">
              Cart
              {totalQty > 0 ? (
                <span className="cartBadge">{totalQty}</span>
              ) : null}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}


