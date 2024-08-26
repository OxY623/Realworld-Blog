import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

import { signInUser } from '../../store/actions/authActions'
import Header from '../../components/Header'
import FormHeader from '../../components/FormHeader'
import Button from '../../components/FormButton/FormButton'
import { formatData } from '../../api'

import styles from './SignIn.module.scss'

const SignIn = () => {
  const title = 'Sign In'
  const style = {
    marginTop: '10px',
  }
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
      data = formatData(data)
      await dispatch(signInUser(data))
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
      <div className={styles.signInForm}>
        <FormHeader title={title} styles={styles} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label>Email address:</label>
            <input
              type="email"
              className={errors.email ? styles.errorBorder : ''}
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
              {...register('password', { required: 'Password is required' })}
              disabled={loading}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          {error && <p className={styles.error}>{error.message}</p>}
          <Button style={style} type="submit" loading={loading}>
            Login
          </Button>
        </form>
        <div className={styles.footer}>
          <span>Don’t have an account?</span>{' '}
          <Link to={'/sign-up'} className={styles.link}>
            Sign Up.
          </Link>
        </div>
      </div>
    </>
  )
}

export default SignIn
