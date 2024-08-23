import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import Header from '../components/Header'

import styles from './Profile.module.scss'

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await axios.put('https://blog.kata.academy/api/user', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store token in local storage
        },
      })
      setSuccessMessage('Profile updated successfully!')
    } catch (error) {
      // Handle server errors
      if (error.response && error.response.data) {
        const { errors: serverErrors } = error.response.data
        for (const [field, message] of Object.entries(serverErrors)) {
          setError(field, { type: 'manual', message })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              disabled={loading}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email',
                },
              })}
              disabled={loading}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>New Password:</label>
            <input
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
            />
            {errors.newPassword && (
              <p className={styles.error}>{errors.newPassword.message}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>Avatar URL:</label>
            <input
              type="text"
              {...register('avatar', {
                pattern: {
                  value: /^https?:\/\/[^\s]+$/,
                  message: 'Invalid URL',
                },
              })}
              disabled={loading}
            />
            {errors.avatar && (
              <p className={styles.error}>{errors.avatar.message}</p>
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
