import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

import { signInUser } from '../../store/actions/authActions'
import Header from '../../components/Header'
import FormHeader from '../../components/FormHeader'
import Button from '../../components/FormButton/FormButton'
import { formatData } from '../../api'
import FormGroup from '../../components/FormGroup/FormGroup' // Импортируем компонент FormGroup

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
      data = formatData('user', data)
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
          <FormGroup
            label="Email address"
            name="email"
            type="email"
            placeholder="Email address"
            register={register}
            errors={errors}
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
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            errors={errors}
            validation={{ required: 'Password is required' }}
            disabled={loading}
            styles={styles}
          />
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
