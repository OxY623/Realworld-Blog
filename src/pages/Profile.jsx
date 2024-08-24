import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { updateProfile } from '../store/actions/profileActions'
import Header from '../components/Header'

import styles from './Profile.module.scss'

const Profile = () => {
  const dispatch = useDispatch()
  const { loading, successMessage, errors } = useSelector(
    (state) => state.profile,
  )

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setError,
  } = useForm()

  const onSubmit = (data) => {
    dispatch(updateProfile(data))
  }

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_SUCCESS_MESSAGE' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, dispatch])

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([field, message]) => {
        setError(field, { type: 'manual', message })
      })
    }
  }, [errors, setError])

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.profileForm}>
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
          {successMessage && <p className={styles.success}>{successMessage}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </>
  )
}

export default Profile
