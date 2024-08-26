import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

import Header from '../../components/Header'
import FormHeader from '../../components/FormHeader'
import Button from '../../components/FormButton/FormButton'
import { signUpUser } from '../../store/actions/authActions'
import { formatData } from '../../api'

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
  const title = 'Create new account'

  const onSubmit = (data) => {
    const { repeatPassword, ...filteredData } = data
    data = formatData(filteredData)
    dispatch(signUpUser(data))
  }

  useEffect(() => {
    if (error) {
      for (const [field, message] of Object.entries(error)) {
        setError(field, { type: 'manual', message })
      }
    }
  }, [error, setError])

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Header />
      <div className={styles.signUpForm}>
        <FormHeader title={title} styles={styles} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              className={errors.username ? styles.errorBorder : ''}
              placeholder="Username"
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
            <label>Email address:</label>
            <input
              className={errors.email ? styles.errorBorder : ''}
              type="email"
              placeholder="Email address"
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
              className={errors.password ? styles.errorBorder : ''}
              placeholder="Password"
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
              className={errors.repeatPassword ? styles.errorBorder : ''}
              placeholder="Password"
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
              I agree to the processing of my personal information
            </label>
            {errors.agreement && (
              <p className={styles.error}>{errors.agreement.message}</p>
            )}
          </div>
          <Button type="submit" loading={loading}>
            Create
          </Button>
        </form>
        <div className={styles.footer}>
          <span>Already have an account?</span>{' '}
          <Link to={'/sign-in'} className={styles.link}>
            Sign In.
          </Link>
        </div>
      </div>
    </>
  )
}

export default SignUp
