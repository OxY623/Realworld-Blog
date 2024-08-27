import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import ArticleCard from '../ArticleCard'
import Spinner from '../Spinner'
import NotFound from '../NotFound'
// eslint-disable-next-line import/order
import { fetchArticleById } from '../../store/actions/articlesActions'

// eslint-disable-next-line import/no-unresolved
import ActionButtons from '../ActionButtons'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import styles from './Article.module.scss'

const Article = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()

  const article = useSelector((state) => state.articles.article)
  const loading = useSelector((state) => state.articles.loading)
  const error = useSelector((state) => state.articles.error)

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticleById(slug))
    }
  }, [slug, dispatch])

  // useEffect(() => {
  //   console.log('Article:', article)
  //   console.log('Loading:', loading)
  //   console.log('Error:', error)
  // }, [article, loading, error])

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    )

  if (error)
    return (
      <div>
        <ErrorMessage message={error} />
      </div>
    )

  if (!article)
    return (
      <div>
        <NotFound />
      </div>
    )

  return (
    <div className={styles.container}>
      <div className={styles.article}>
        <ArticleCard
          article={article}
          style={{ color: 'rgba(0, 0, 0, 0.5)' }}
        />
        <ActionButtons />
        <h1 className={styles.title}>{article.title}</h1>
        <ReactMarkdown
          className={styles.body}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        >
          {article.body}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Article
