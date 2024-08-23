import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Header from '../components/Header'
import { signUpUser } from '../store/actions/authActions'

import styles from './SignUp.module.scss'

const SignUp = () => {
  const dispatch = useDispatch()
  const { loading, user, error } = useSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm()

  const password = watch('password')

  const onSubmit = (data) => {
    // Приведение данных к формату, который ожидает API
    const serverData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }
    // Отправка данных через thunk
    dispatch(signUpUser(serverData))
  }

  // Установка ошибок, если пришли ошибки с сервера
  useEffect(() => {
    if (error) {
      for (const [field, message] of Object.entries(error)) {
        setError(field, { type: 'manual', message })
      }
    }
  }, [error, setError])

  // Если регистрация успешна, перенаправляем на главную
  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.signUpForm}>
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
          <label>Username:</label>
          <input
            type="text"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username cannot exceed 20 characters',
              },
            })}
            disabled={loading}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
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
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Repeat Password:</label>
          <input
            type="password"
            {...register('repeatPassword', {
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            disabled={loading}
          />
          {errors.repeatPassword && (
            <p className={styles.error}>{errors.repeatPassword.message}</p>
          )}
        </div>
        <div className={`${styles.formGroup} ${styles.checkboxLabel}`}>
          <label>
            <input
              type="checkbox"
              {...register('agreement', {
                required: 'You must agree to the terms',
              })}
              disabled={loading}
            />
            Agree to terms
          </label>
          {errors.agreement && (
            <p className={styles.error}>{errors.agreement.message}</p>
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </>
  )
}

export default SignUp
