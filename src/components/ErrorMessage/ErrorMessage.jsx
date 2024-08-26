import React from 'react'

import styles from './ErrorMessage.module.scss' // Импортируем стили

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.errorMessage}>
      <h2 className={styles.title}>Error</h2>
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default ErrorMessage
