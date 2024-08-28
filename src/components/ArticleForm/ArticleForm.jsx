import React from 'react'
import { useForm, Controller } from 'react-hook-form'

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
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialTitle,
      description: initialDescription,
      body: initialBody,
      tags: initialTags,
    },
  })

  const tags = watch('tags')

  const handleAddTag = () => {
    setValue('tags', [...tags, ''])
  }

  const handleDeleteTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index)
    setValue('tags', updatedTags)
  }

  const onSubmitForm = (data) => {
    onSubmit({ ...data, tagList: data.tags.filter((tag) => tag.trim() !== '') })
  }

  return (
    <div className="container">
      <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                id="title"
                type="text"
                placeholder="Title"
                {...field}
                className={`${styles.input} ${errors.title ? styles.errorBorder : ''}`}
              />
            )}
            rules={{ required: 'Title is required' }}
          />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Short Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input
                id="description"
                type="text"
                placeholder="Short Description"
                {...field}
                className={`${styles.input} ${errors.description ? styles.errorBorder : ''}`}
              />
            )}
            rules={{ required: 'Description is required' }}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="body" className={styles.label}>
            Text
          </label>
          <Controller
            name="body"
            control={control}
            render={({ field }) => (
              <textarea
                id="body"
                placeholder="Text"
                {...field}
                className={`${styles.textarea} ${errors.body ? styles.errorBorder : ''}`}
              />
            )}
            rules={{ required: 'Body text is required' }}
          />
          {errors.body && <p className={styles.error}>{errors.body.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Tags</label>
          <div className={styles.wrapper}>
            {tags.length === 0 ? null : (
              <div className={styles.tagsContainer}>
                {tags.map((tag, index) => (
                  <div key={index} className={styles.wrapper}>
                    <Controller
                      name={`tags[${index}]`}
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          placeholder="Tag"
                          {...field}
                          className={styles.tag}
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteTag(index)}
                      className={styles.deleteTagButton}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={handleAddTag}
              className={styles.addTagButton}
            >
              Add tag
            </button>
          </div>
        </div>
        <div className={styles.button_send}>
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  )
}

export default ArticleForm
