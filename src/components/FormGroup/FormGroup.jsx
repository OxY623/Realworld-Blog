import React from 'react'

// eslint-disable-next-line no-unused-vars
import styles from './FormGroup.module.scss'

const FormGroup = ({
  label,
  name,
  type,
  placeholder,
  register,
  errors,
  validation,
  disabled,
  styles,
}) => (
  <div className={styles.formGroup}>
    <label>{label}:</label>
    <input
      type={type}
      className={errors[name] ? styles.errorBorder : ''}
      placeholder={placeholder}
      {...register(name, validation)}
      disabled={disabled}
    />
    {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
  </div>
)

export default FormGroup
