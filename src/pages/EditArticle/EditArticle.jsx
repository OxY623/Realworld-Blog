import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { editArticle, getArticles } from '../../store/actions/articlesActions'
import FormHeader from '../../components/FormHeader'
import Header from '../../components/Header'
import ArticleForm from '../../components/ArticleForm'

import styles from './EditArticle.module.scss'

const EditArticle = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const article = useSelector((state) =>
    state.articles.articles.find((a) => a.slug === slug),
  )

  const [error, setError] = useState('')

  const handleSubmit = async (data) => {
    const { title, description, body, tagList } = data

    if (!title || !description || !body) {
      setError('All fields are required')
      return
    }

    try {
      await dispatch(editArticle(slug, { title, description, body, tagList }))
      await dispatch(getArticles(1))
      navigate(`/articles/${slug}`)
    } catch (err) {
      setError('Failed to update article')
    }
  }

  useEffect(() => {
    if (article) {
      // Set initial values when article is loaded
    }
  }, [article])

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div>
          <div className={styles.formHeader}>
            <FormHeader title="Edit Article" styles={styles} />
          </div>
          {article && (
            <ArticleForm
              initialTitle={article.title}
              initialDescription={article.description}
              initialBody={article.body}
              initialTags={article.tagList || []}
              onSubmit={handleSubmit}
              error={error}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default EditArticle
