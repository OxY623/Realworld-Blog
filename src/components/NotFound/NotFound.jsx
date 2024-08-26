import React from 'react'

import styles from './NotFound.module.scss' // Импортируем стили

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h2 className={styles.title}>No Data Found</h2>
      <p className={styles.message}>Ничего не найдено</p>
    </div>
  )
}

export default NotFound
