import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import Button from '../../components/FormButton'

import styles from './ArticleForm.module.scss'

// Генерация уникальных идентификаторов
const generateId = () => '_' + Math.random().toString(36).substr(2, 9)

const ArticleForm = ({
  initialTitle = '',
  initialDescription = '',
  initialBody = '',
  initialTags = [],
  onSubmit,
  error,
}) => {
  const initialTagsWithId = initialTags.map((tag) => ({
    id: generateId(),
    value: tag,
  }))

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
      tags: initialTagsWithId,
    },
  })

  const tags = watch('tags')

  const addTag = () => {
    setValue('tags', [...tags, { id: generateId(), value: '' }])
  }

  const deleteTag = (id) => {
    setValue(
      'tags',
      tags.filter((tag) => tag.id !== id),
    )
  }

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      tagList: data.tags
        .map((tag) => tag.value)
        .filter((tag) => tag.trim() !== ''),
    })
  }

  return (
    <div className="container">
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <FormField
          id="title"
          label="Title"
          type="text"
          placeholder="Title"
          name="title"
          control={control}
          error={errors.title}
          rules={{ required: 'Title is required' }}
        />

        <FormField
          id="description"
          label="Short Description"
          type="text"
          placeholder="Short Description"
          name="description"
          control={control}
          error={errors.description}
          rules={{ required: 'Description is required' }}
        />

        <FormField
          id="body"
          label="Text"
          type="textarea"
          placeholder="Text"
          name="body"
          control={control}
          error={errors.body}
          rules={{ required: 'Body text is required' }}
        />

        <div className={styles.formGroup}>
          <label className={styles.label}>Tags</label>
          <div className={styles.wrapper}>
            {tags.length > 0 && (
              <div className={styles.tagsContainer}>
                {tags.map((tag) => (
                  <div key={tag.id} className={styles.wrapper}>
                    <Controller
                      name={`tags[${tags.findIndex((t) => t.id === tag.id)}].value`}
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
                      onClick={() => deleteTag(tag.id)}
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
              onClick={addTag}
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

const FormField = ({
  id,
  label,
  type,
  placeholder,
  name,
  control,
  error,
  rules,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return type === 'textarea' ? (
          <textarea
            id={id}
            placeholder={placeholder}
            {...field}
            className={`${styles.textarea} ${error ? styles.errorBorder : ''}`}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            {...field}
            className={`${styles.input} ${error ? styles.errorBorder : ''}`}
          />
        )
      }}
      rules={rules}
    />
    {error && <p className={styles.error}>{error.message}</p>}
  </div>
)

export default ArticleForm

// import React from 'react'
// import { useForm, Controller } from 'react-hook-form'
//
// import Button from '../../components/FormButton'
//
// import styles from './ArticleForm.module.scss'
//
// const ArticleForm = ({
//   initialTitle = '',
//   initialDescription = '',
//   initialBody = '',
//   initialTags = [],
//   onSubmit,
//   error,
// }) => {
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       title: initialTitle,
//       description: initialDescription,
//       body: initialBody,
//       tags: initialTags,
//     },
//   })
//
//   const tags = watch('tags')
//
//   const handleAddTag = () => {
//     setValue('tags', [...tags, ''])
//   }
//
//   const handleDeleteTag = (index) => {
//     const updatedTags = tags.filter((_, i) => i !== index)
//     setValue('tags', updatedTags)
//   }
//
//   const onSubmitForm = (data) => {
//     onSubmit({ ...data, tagList: data.tags.filter((tag) => tag.trim() !== '') })
//   }
//
//   return (
//     <div className="container">
//       <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
//         {error && <p className={styles.errorMessage}>{error}</p>}
//
//         <div className={styles.formGroup}>
//           <label htmlFor="title" className={styles.label}>
//             Title
//           </label>
//           <Controller
//             name="title"
//             control={control}
//             render={({ field }) => (
//               <input
//                 id="title"
//                 type="text"
//                 placeholder="Title"
//                 {...field}
//                 className={`${styles.input} ${errors.title ? styles.errorBorder : ''}`}
//               />
//             )}
//             rules={{ required: 'Title is required' }}
//           />
//           {errors.title && (
//             <p className={styles.error}>{errors.title.message}</p>
//           )}
//         </div>
//
//         <div className={styles.formGroup}>
//           <label htmlFor="description" className={styles.label}>
//             Short Description
//           </label>
//           <Controller
//             name="description"
//             control={control}
//             render={({ field }) => (
//               <input
//                 id="description"
//                 type="text"
//                 placeholder="Short Description"
//                 {...field}
//                 className={`${styles.input} ${errors.description ? styles.errorBorder : ''}`}
//               />
//             )}
//             rules={{ required: 'Description is required' }}
//           />
//           {errors.description && (
//             <p className={styles.error}>{errors.description.message}</p>
//           )}
//         </div>
//
//         <div className={styles.formGroup}>
//           <label htmlFor="body" className={styles.label}>
//             Text
//           </label>
//           <Controller
//             name="body"
//             control={control}
//             render={({ field }) => (
//               <textarea
//                 id="body"
//                 placeholder="Text"
//                 {...field}
//                 className={`${styles.textarea} ${errors.body ? styles.errorBorder : ''}`}
//               />
//             )}
//             rules={{ required: 'Body text is required' }}
//           />
//           {errors.body && <p className={styles.error}>{errors.body.message}</p>}
//         </div>
//
//         <div className={styles.formGroup}>
//           <label className={styles.label}>Tags</label>
//           <div className={styles.wrapper}>
//             {tags.length === 0 ? null : (
//               <div className={styles.tagsContainer}>
//                 {tags.map((tag, index) => (
//                   <div key={index} className={styles.wrapper}>
//                     <Controller
//                       name={`tags[${index}]`}
//                       control={control}
//                       render={({ field }) => (
//                         <input
//                           type="text"
//                           placeholder="Tag"
//                           {...field}
//                           className={styles.tag}
//                         />
//                       )}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => handleDeleteTag(index)}
//                       className={styles.deleteTagButton}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//             <button
//               type="button"
//               onClick={handleAddTag}
//               className={styles.addTagButton}
//             >
//               Add tag
//             </button>
//           </div>
//         </div>
//         <div className={styles.button_send}>
//           <Button type="submit">Send</Button>
//         </div>
//       </form>
//     </div>
//   )
// }
//
// export default ArticleForm
