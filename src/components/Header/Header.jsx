import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../store/actions/authActions'

import styles from './Header.module.scss'
import userLogo from './user_logo.svg'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authState = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logo__link} aria-label="Logotype & link">
          Realworld Blog
        </Link>
      </div>
      {authState ? (
        <div className={styles.secretWrapper}>
          <button className={styles.createArticle}>Create article</button>
          <div className={styles.userInfo}>
            <Link className={styles.nameUser} to="/profile">
              {user?.username || 'User'}
            </Link>
            <Link to="/profile">
              <img
                className={styles.userInfo_img}
                src={user?.image || userLogo}
                alt="User Logo"
              />
            </Link>
            <button className={styles.logout} onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.simpleWrapper}>
          <Link to="/sign-in" className={styles.signIn}>
            Sign In
          </Link>
          <Link to="/sign-up" className={styles.signUp}>
            Sign Up
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
