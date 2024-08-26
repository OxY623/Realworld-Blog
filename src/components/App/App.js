import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

// Import pages
import ArticlesPage from '../../pages/ArticlesPage'
import ArticlePage from '../../pages/ArticlePage'
import SignIn from '../../pages/SignIn'
import Profile from '../../pages/Profile'
import SignUp from '../../pages/SignUp'
import LocalStorageAPI from '../../api/LocalStorageAPI'
import { logout, getUser } from '../../store/actions/authActions'
// import Spinner from '../Spinner'
import NewArticle from '../../pages/NewArticle'
import EditArticle from '../../pages/EditArticle'

import styles from './App.module.scss'

// const ArticlesPage = lazy(() => import('../../pages/ArticlesPage'))
// const NewArticle = lazy(() => import('../../pages/NewArticle'))
// const ArticlePage = lazy(() => import('../../pages/ArticlePage'))
// const EditArticle = lazy(() => import('../../pages/EditArticle'))
// const SignIn = lazy(() => import('../../pages/SignIn'))
// const SignUp = lazy(() => import('../../pages/SignUp'))
// const Profile = lazy(() => import('../../pages/Profile'))

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
    <div className={styles.app}>
      <Router>
        {/*<Suspense*/}
        {/*  fallback={*/}
        {/*    <div>*/}
        {/*      <Spinner />*/}
        {/*    </div>*/}
        {/*  }*/}
        {/*>*/}
        <Routes>
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/new-article" element={<NewArticle />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/articles/:slug/edit" element={<EditArticle />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/*</Suspense>*/}
      </Router>
    </div>
  )
}

export default App
