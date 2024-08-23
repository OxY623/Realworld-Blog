import React from 'react'

import styles from './Spinner.module.scss'

export function Spinner() {
  return (
    <div className={styles.skFoldingCube}>
      <div className={`${styles.skCube} ${styles.skCube1}`}></div>
      <div className={`${styles.skCube} ${styles.skCube2}`}></div>
      <div className={`${styles.skCube} ${styles.skCube4}`}></div>
      <div className={`${styles.skCube} ${styles.skCube3}`}></div>
    </div>
  )
}
