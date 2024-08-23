import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//import { getArticles, setPage } from '../../store/actions/articlesActions'
//import Header from '../Header'
// import Article from '../Article'
// import Pagination from '../Pagination'
import ArticlesPage from '../../pages/ArticlesPage'
import ArticlePage from '../../pages/ArticlePage'
import SignIn from '../../pages/SignIn'
import Profile from '../../pages/Profile'
import SignUp from '../../pages/SignUp'

function App() {
  return (
    <div className="app">
      <Router>
        {/*<Header />*/}
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
