import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import ArticleCard from '../ArticleCard'
import Spinner from '../Spinner'
import NotFound from '../NotFound'
import { fetchArticleById } from '../../store/actions/articlesActions'
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
    if (slug && (!article || article.slug !== slug)) {
      dispatch(fetchArticleById(slug))
    }
  }, [slug, dispatch, article])

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  if (!article) {
    return error ? <ErrorMessage message={error} /> : <NotFound />
  }

  return (
    <div className={styles.container}>
      <div className={styles.article}>
        <ArticleCard article={article} />
        <ActionButtons />
        {/*<h1 className={styles.title}>{article.title}</h1>*/}
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
