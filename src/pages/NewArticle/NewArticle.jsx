import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createArticle } from '../../store/actions/articlesActions'
import FormHeader from '../../components/FormHeader'
import Header from '../../components/Header'
import Button from '../../components/FormButton'

import styles from './NewArticle.module.scss'

const NewArticle = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !body) {
      setError('All fields are required')
      return
    }

    try {
      dispatch(createArticle({ title, description, body }))
      navigate('/')
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
            <FormHeader title="Create New Article" styles={styles} />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Short Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.input}
              required
            />
            <textarea
              placeholder="Text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={styles.textarea}
              required
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewArticle
