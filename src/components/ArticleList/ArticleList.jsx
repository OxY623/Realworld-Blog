import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import 'antd/dist/reset.css'

import { getArticles, setPage } from '../../store/actions/articlesActions'
// import Pagination from '../Pagination'
import ArticleCard from '../ArticleCard'
import Spinner from '../Spinner'

import styles from './ArticleList.module.scss'

const ArticleList = () => {
  const articles = useSelector((state) => state.articles.articles)
  const loading = useSelector((state) => state.articles.loading)
  const error = useSelector((state) => state.articles.error)
  const page = useSelector((state) => state.articles.page)
  const totalArticles = useSelector((state) => state.articles.totalArticles)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArticles(page))
  }, [dispatch, page])

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    )
  if (error) return <div>Error: {error}</div>

  return (
    <div className={styles.articleList}>
      <div className={styles.container}>
        {/*<ArticleCard />*/}
        {articles.length === 0 ? (
          <div>No articles found</div>
        ) : (
          articles.map((article) => (
            // eslint-disable-next-line react/jsx-key
            <Link
              key={article.slug}
              className={styles.link}
              to={`/articles/${article.slug}`}
            >
              <ArticleCard article={article} />
            </Link>
          ))
        )}
        {/* Пагинация */}
      </div>
      <div className={styles.articlesPaginater}>
        <Pagination
          current={page}
          onChange={(newPage) => dispatch(setPage(newPage))}
          total={totalArticles}
          pageSize={5}
        />
      </div>
    </div>
  )
}

export default ArticleList
