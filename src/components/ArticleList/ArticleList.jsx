import React, { useEffect, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
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
  const totalArticles = useSelector((state) => state.articles.totalArticles)
  const currentPage = useSelector((state) => state.articles.page)
  const { page: urlPage } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const pageNumber = parseInt(urlPage, 10) || 1

  useEffect(() => {
    if (pageNumber !== currentPage) {
      dispatch(setPage(pageNumber))
    }
  }, [dispatch, pageNumber, currentPage])

  useEffect(() => {
    dispatch(getArticles(pageNumber))
  }, [dispatch, pageNumber])

  const articleList = useMemo(() => {
    return articles.map((article) => (
      <ArticleCard key={article.slug} article={article} />
    ))
  }, [articles])

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(setPage(newPage))
      navigate(`/articles/page/${newPage}`, { replace: true })
    },
    [dispatch, navigate],
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
          current={pageNumber}
          onChange={handlePageChange}
          total={totalArticles}
          pageSize={5}
        />
      </div>
    </div>
  )
}

export default ArticleList
