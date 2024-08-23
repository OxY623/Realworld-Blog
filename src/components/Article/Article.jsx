import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import ArticleCard from '../ArticleCard'
import Spinner from '../Spinner'
import { fetchArticleById } from '../../store/actions/articleActions'

// eslint-disable-next-line import/no-unresolved
import styles from './Article.module.scss'
const Article = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()

  const { article, loading, error } = useSelector(
    (state) => state.article || {},
  )

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticleById(slug))
    }
  }, [slug, dispatch])

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    )
  if (error) return <div>Error: {error}</div>

  // Проверка на наличие статьи перед рендерингом
  if (!article) return <div>No article found.</div>

  return (
    <div className={styles.container}>
      <div className={styles.article}>
        <ArticleCard article={article} style={{ boxShadow: 'none' }} />
        <h1 className={styles.title}>{article.title}</h1>
        <ReactMarkdown className={styles.body}>{article.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Article
