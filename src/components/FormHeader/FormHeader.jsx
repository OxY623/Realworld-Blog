import styles from './FormHeader.module.scss'

const FormHeader = ({ title }) => {
  return <h2 className={styles.form_header}>{title}</h2>
}

export default FormHeader
