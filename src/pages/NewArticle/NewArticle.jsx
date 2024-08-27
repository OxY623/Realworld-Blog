import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createArticle, getArticles } from '../../store/actions/articlesActions'
import FormHeader from '../../components/FormHeader'
import Header from '../../components/Header'
import ArticleForm from '../../components/ArticleForm/ArticleForm' // Импортируем ArticleForm

import styles from './NewArticle.module.scss'

const NewArticle = () => {
  const [error, setError] = useState('')
  const [flag, setFlag] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const articleSlug = useSelector((state) => state.articles.article?.slug)

  useEffect(() => {
    if (flag && articleSlug) {
      navigate(`/articles/${articleSlug}`)
    }
  }, [articleSlug, navigate, flag])

  const handleSubmit = async (data) => {
    const { title, description, body, tagList } = data

    if (!title || !description || !body) {
      setError('All fields are required')
      return
    }

    try {
      dispatch(createArticle({ title, description, body, tagList }))
      dispatch(getArticles(1))
      setFlag(true)
    } catch (err) {
      setError('Failed to create article')
    }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div>
          <div className={styles.formHeader}>
            <FormHeader title="Create New Article" />
          </div>
          <ArticleForm onSubmit={handleSubmit} error={error} />
        </div>
      </div>
    </>
  )
}

export default NewArticle
