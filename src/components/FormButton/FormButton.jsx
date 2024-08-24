import React from 'react'
import PropTypes from 'prop-types'

import styles from './FormButton.module.scss'

const Button = ({
  children,
  type = 'button',
  onClick,
  loading = false,
  disabled = false,
  className = '',
  style = {},
}) => {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.button} ${className}`}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

export default Button
