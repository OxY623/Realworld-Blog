import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteArticle } from '../../store/actions/articlesActions' // Импортируем стили

import styles from './ActionButtons.module.scss'

const ActionButtons = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch()
  const author = useSelector((state) => state.articles.article.author.username)
  const isAuth = useSelector((state) => state.auth.isAuthenticated)
  console.log(isAuth)
  const user = useSelector((state) => state.auth.user?.username)
  const isAuthor = user === author && isAuth // Проверяем авторизован ли пользователь и является ли он автором статьи
  const article = useSelector((state) => state.articles.article)

  const navigate = useNavigate()

  const handleDelete = () => {
    dispatch(deleteArticle(article.slug)) // Удаляем статью с сервера
  }

  const handleEdit = () => {
    navigate('/articles/:slug/edit')
  }

  if (!isAuthor) return <></>
  return (
    <div className={styles.actionButtons}>
      <button className={styles.button} onClick={handleEdit}>
        Edit
      </button>
      <button className={styles.button} onClick={handleDelete}>
        Delete
      </button>
    </div>
  )
}

export default ActionButtons
