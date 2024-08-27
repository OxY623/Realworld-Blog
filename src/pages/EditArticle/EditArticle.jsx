import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  editArticle,
  fetchArticleById,
} from '../../store/actions/articlesActions'
import FormHeader from '../../components/FormHeader'
import Header from '../../components/Header'
import ArticleForm from '../../components/ArticleForm'
import Spinner from '../../components/Spinner'

import styles from './EditArticle.module.scss'

const EditArticle = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Получение статьи из Redux
  const article = useSelector((state) => state.articles.article)

  const [error, setError] = useState('')

  useEffect(() => {
    if (!article) {
      // Если статья не найдена, загружаем её
      dispatch(fetchArticleById(slug))
    }
  }, [article, slug, dispatch])

  const handleSubmit = async (data) => {
    const { title, description, body, tagList } = data

    if (!title || !description || !body) {
      setError('All fields are required')
      return
    }

    try {
      await dispatch(editArticle(slug, { title, description, body, tagList }))
      await dispatch(fetchArticleById(slug))
      navigate(`/articles/${slug}`)
    } catch (err) {
      setError('Failed to update article')
    }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div>
          <div className={styles.formHeader}>
            <FormHeader title="Edit Article" styles={styles} />
          </div>
          {article ? (
            <ArticleForm
              initialTitle={article.title}
              initialDescription={article.description}
              initialBody={article.body}
              initialTags={article.tagList || []}
              onSubmit={handleSubmit}
              error={error}
            />
          ) : (
            <div>
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default EditArticle
