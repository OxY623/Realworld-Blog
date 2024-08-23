import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { signInUser } from '../store/actions/authActions'
import Header from '../components/Header'

import styles from './SignIn.module.scss'

const SignIn = () => {
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()
  const { user, loading, error } = useSelector((state) => state.auth)

  const onSubmit = async (data) => {
    try {
      const serverData = {
        user: {
          email: data.email,
          password: data.password,
        },
      }
      await dispatch(signInUser(serverData))
      setRedirect(true)
    } catch (err) {
      if (err.payload && err.payload.errors) {
        const { errors: serverErrors } = err.payload
        for (const [field, message] of Object.entries(serverErrors)) {
          setError(field, { type: 'manual', message })
        }
      } else {
        console.error('Unexpected error:', err)
      }
    }
  }

  if (redirect || user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.signInForm}>
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
          <label>Password:</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            disabled={loading}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        {error && <p className={styles.error}>{error.message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </>
  )
}

export default SignIn
