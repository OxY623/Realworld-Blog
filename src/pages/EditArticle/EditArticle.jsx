import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { editArticle } from '../../store/actions/articlesActions'

const EditArticle = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const article = useSelector((state) =>
    state.article.articles.find((a) => a.slug === slug),
  )

  const [title, setTitle] = useState(article?.title || '')
  const [description, setDescription] = useState(article?.description || '')
  const [body, setBody] = useState(article?.body || '')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !description || !body) {
      setError('All fields are required')
      return
    }

    try {
      dispatch(editArticle(slug, { title, description, body }))
      navigate(`/articles/${slug}`)
    } catch (err) {
      setError('Failed to update article')
    }
  }

  return (
    <div>
      <h1>Edit Article</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <textarea
          placeholder="Text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">Update Article</button>
      </form>
    </div>
  )
}

export default EditArticle
