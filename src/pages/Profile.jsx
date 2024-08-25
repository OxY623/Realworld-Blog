import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { updateUser } from '../store/actions/authActions'
import Header from '../components/Header'
import FormHeader from '../components/FormHeader'
import Button from '../components/FormButton/FormButton'

import styles from './Profile.module.scss'

const Profile = () => {
  const [redirect, setRedirect] = useState(false)
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
    const ServerData = {
      user: {
        email: 'fuzzydoo45rproductions0@gmail.com',
        username: 'artem26245',
        bio: 'I love SPB.',
        image:
          'https://avatars.mds.yandex.net/i?id=df101efcb87c856cf747bf00201eecc5_sr-4613694-images-thumbs&n=13',
      },
    }
    dispatch(updateUser(ServerData))
  }

  useEffect(() => {
    if (updateUserSuccess) {
      console.log(updateUserSuccess)
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
          <FormHeader title="Profile" styles={styles} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                {...register('username', { required: 'Username is required' })}
                disabled={loading}
                className={formErrors.username ? styles.errorBorder : ''}
              />
              {formErrors.username && (
                <p className={styles.error}>{formErrors.username.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email',
                  },
                })}
                disabled={loading}
                className={formErrors.email ? styles.errorBorder : ''}
              />
              {formErrors.email && (
                <p className={styles.error}>{formErrors.email.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="newPassword">New Password:</label>
              <input
                id="newPassword"
                type="password"
                {...register('newPassword', {
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Password cannot exceed 40 characters',
                  },
                })}
                disabled={loading}
                className={formErrors.newPassword ? styles.errorBorder : ''}
              />
              {formErrors.newPassword && (
                <p className={styles.error}>{formErrors.newPassword.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="avatar">Avatar URL:</label>
              <input
                id="avatar"
                type="text"
                {...register('avatar', {
                  pattern: {
                    value: /^https?:\/\/[^\s]+$/,
                    message: 'Invalid URL',
                  },
                })}
                disabled={loading}
                className={formErrors.avatar ? styles.errorBorder : ''}
              />
              {formErrors.avatar && (
                <p className={styles.error}>{formErrors.avatar.message}</p>
              )}
            </div>
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
