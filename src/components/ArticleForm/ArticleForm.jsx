import React, { useState } from 'react'

import Button from '../../components/FormButton'

import styles from './ArticleForm.module.scss'

const ArticleForm = ({
  initialTitle = '',
  initialDescription = '',
  initialBody = '',
  initialTags = [],
  onSubmit,
  error,
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [body, setBody] = useState(initialBody)
  const [tags, setTags] = useState(initialTags)
  const [newTag, setNewTag] = useState('')

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }

  const handleDeleteTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index)
    setTags(updatedTags)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, description, body, tagList: tags })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.errorMessage}>{error}</p>}
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
      <div className={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tag}>
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleDeleteTag(index)}
              className={styles.deleteTagButton}
            >
              Delete
            </button>
          </div>
        ))}
        <div className={styles.addTagContainer}>
          <input
            type="text"
            placeholder="Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className={styles.input}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className={styles.addTagButton}
          >
            Add tag
          </button>
        </div>
      </div>
      <Button type="submit">Send</Button>
    </form>
  )
}

export default ArticleForm
