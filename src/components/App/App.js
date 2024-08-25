import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Import pages
import ArticlesPage from '../../pages/ArticlesPage'
import ArticlePage from '../../pages/ArticlePage'
import SignIn from '../../pages/SignIn'
import Profile from '../../pages/Profile'
import SignUp from '../../pages/SignUp'
import LocalStorageAPI from '../../store/LocalStorageAPI'
import { logout, getUser } from '../../store/actions/authActions'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (LocalStorageAPI.load('token')) {
      dispatch(getUser())
    } else {
      dispatch(logout())
    }
  }, [dispatch])

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
