import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createArticle } from '../../store/actions/articlesActions'
import FormHeader from '../../components/FormHeader'
import Header from '../../components/Header'
import ArticleForm from '../../components/ArticleForm/ArticleForm'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

import styles from './NewArticle.module.scss'

const NewArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdArticleSlug, setCreatedArticleSlug] = useState(null)

  const article = useSelector((state) => state.articles.article)
  const error = useSelector((state) => state.articles.error)

  useEffect(() => {
    if (article?.slug && isSubmitting) {
      setCreatedArticleSlug(article.slug)
      setIsSubmitting(false)
    }
  }, [article, isSubmitting])

  useEffect(() => {
    if (createdArticleSlug) {
      console.log(createdArticleSlug)
      navigate(`/articles/${createdArticleSlug}`)
    }
  }, [createdArticleSlug, navigate])

  const handleSubmit = (data) => {
    const { title, description, body, tagList } = data

    if (!title || !description || !body) {
      return <ErrorMessage />
    }

    dispatch(createArticle({ title, description, body, tagList })).then(() =>
      setIsSubmitting(true),
    )
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.container_form}>
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
