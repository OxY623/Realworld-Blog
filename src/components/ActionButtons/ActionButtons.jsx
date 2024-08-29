import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteArticle, getArticles } from '../../store/actions/articlesActions'

import styles from './ActionButtons.module.scss'
//import warning from './Frame 19.svg'
import warningIcon from './Frame 19.svg'

const ActionButtons = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const author = useSelector((state) => state.articles.article.author.username)
  const isAuth = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user?.username)
  const isAuthor = user === author && isAuth
  const article = useSelector((state) => state.articles.article)

  const [showValidationPopup, setShowValidationPopup] = useState(false)
  const popupRef = useRef(null) // Create a ref for the popup

  const handleDelete = useCallback(() => {
    setShowValidationPopup(true)
  }, [])

  const handleEdit = useCallback(() => {
    navigate(`/articles/${article.slug}/edit`)
  }, [navigate, article.slug])

  const confirmDelete = useCallback(() => {
    dispatch(deleteArticle(article.slug))
      .then(() => {
        //dispatch(fetchArticleById(article.slug))
        //Написать редюсер очистки при удалении статьи из article
        dispatch(getArticles(1))
        navigate('/')
      })
      .catch((error) => {
        console.error('Failed to delete the article:', error)
      })
  }, [dispatch, navigate, article.slug])

  const cancelDelete = useCallback(() => {
    setShowValidationPopup(false)
  }, [])

  // Handle clicks outside the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowValidationPopup(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!isAuthor) return null

  return (
    <div className={styles.actionButtons}>
      <button
        className={styles.button}
        onClick={handleDelete}
        aria-label="Delete article"
      >
        Delete
      </button>
      <button
        className={styles.button}
        onClick={handleEdit}
        aria-label="Edit article"
      >
        Edit
      </button>
      {showValidationPopup && (
        <div className={styles.validationPopup} ref={popupRef}>
          <div className={styles.wrapperPopup}>
            <img className={styles.logo} alt="Warning icon" src={warningIcon} />
            <p>Are you sure you want to delete this article?</p>
          </div>

          <div className={styles.popupButtons}>
            <button onClick={cancelDelete} className={styles.cancelButton}>
              No
            </button>
            <button onClick={confirmDelete} className={styles.confirmButton}>
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActionButtons
