import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { updateUser } from '../../store/actions/authActions'
import { formatData } from '../../api'
import Header from '../../components/Header'
import FormHeader from '../../components/FormHeader'
import Button from '../../components/FormButton/FormButton'
import FormGroup from '../../components/FormGroup/FormGroup' // Импортируем компонент FormGroup

import styles from './Profile.module.scss'

const Profile = () => {
  const [redirect, setRedirect] = useState(false)
  const stringsArray = ['Avatar image', 'e.g., https://example.com/image.jpg']
  const randomStringPlaceholder =
    stringsArray[Math.floor(Math.random() * stringsArray.length)]
  const dispatch = useDispatch()
  const { user, loading, error, updateUserSuccess } = useSelector(
    (state) => state.auth,
  )

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setError,
    reset,
  } = useForm()

  const onSubmit = (data) => {
    data = formatData('user', data)
    dispatch(updateUser(data))
  }

  useEffect(() => {
    if (updateUserSuccess) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_UPDATE_USER_SUCCESS' })
        setRedirect(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [updateUserSuccess, dispatch])

  useEffect(() => {
    if (error) {
      Object.entries(error).forEach(([field, message]) => {
        setError(field, { type: 'manual', message })
      })
    }
  }, [error, setError])

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
        email: user.email || '',
      })
    }
  }, [user, reset])

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.profileForm}>
          <FormHeader title="Edit Profile" styles={styles} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup
              label="Username"
              name="username"
              type="text"
              placeholder="Username"
              register={register}
              errors={formErrors}
              validation={{ required: 'Username is required' }}
              disabled={loading}
              styles={styles}
            />
            <FormGroup
              label="Email address"
              name="email"
              type="email"
              placeholder="Email address"
              register={register}
              errors={formErrors}
              validation={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email',
                },
              }}
              disabled={loading}
              styles={styles}
            />
            <FormGroup
              label="New Password"
              name="password"
              type="password"
              placeholder="New Password"
              register={register}
              errors={formErrors}
              validation={{
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Password cannot exceed 40 characters',
                },
              }}
              disabled={loading}
              styles={styles}
            />
            <FormGroup
              label="Avatar image (url)"
              name="image"
              type="text"
              placeholder={randomStringPlaceholder}
              register={register}
              errors={formErrors}
              validation={{
                pattern: {
                  value: /^https?:\/\/[^\s]+$/,
                  message: 'Invalid URL',
                },
              }}
              disabled={loading}
              styles={styles}
            />
            {updateUserSuccess && (
              <p className={styles.success}>
                Данные были успешно обновлены. Подождите...
              </p>
            )}
            <Button type="submit" loading={loading}>
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Profile
