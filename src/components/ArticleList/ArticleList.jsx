import React, { useEffect, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import 'antd/dist/reset.css'

import { getArticles, setPage } from '../../store/actions/articlesActions'
import ArticleCard from '../ArticleCard'
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import NotFound from '../NotFound'

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

  const style = useMemo(() => ({ color: 'rgba(0, 0, 0, 0.75)' }), [])

  const articleList = useMemo(() => {
    return articles.map((article) => (
      <Link
        key={article.slug}
        className={styles.link}
        to={`/articles/${article.slug}`}
      >
        <ArticleCard article={article} style={style} />
      </Link>
    ))
  }, [articles, style])

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(setPage(newPage))
    },
    [dispatch],
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (articles.length === 0) {
    return <NotFound />
  }

  return (
    <div className={styles.articleList}>
      <div className={styles.container}>{articleList}</div>
      <div className={styles.articlesPaginater}>
        <Pagination
          current={page}
          onChange={handlePageChange}
          total={totalArticles}
          pageSize={5}
        />
      </div>
    </div>
  )
}

export default ArticleList
