import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'

import {
  favoriteArticle,
  unfavoritedArticle,
} from '../../store/actions/articlesActions'

import styles from './ArticleCard.module.scss'
import TransparentHeart from './TransparentHeart'
import defaultUserLogo from './user_logo.svg'

const ArticleCard = (props) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const article = props.article || {}
  const [liked, setLiked] = useState(article.favorited || false)

  const {
    title = 'Untitled',
    description = 'No description available',
    updatedAt = new Date().toISOString(),
    tagList = [],
    author = { username: 'Anonymous', image: defaultUserLogo },
    favoritesCount = 0,
  } = article

  const { style } = props

  useEffect(() => {
    setLiked(article.favorited)
  }, [article.favorited])

  const handleLikeClick = (event) => {
    event.stopPropagation() // Останавливаем всплытие события

    if (liked) {
      dispatch(unfavoritedArticle(article.slug))
    } else {
      dispatch(favoriteArticle(article.slug))
    }
    setLiked(!liked)
  }

  const dateUpdated = new Date(updatedAt)
  const formattedDate = format(dateUpdated, 'MMMM d, yyyy')
  const tagListElements = tagList.map((tag, index) => (
    <span key={index} className={styles.tag}>
      {tag}
    </span>
  ))

  const authorName = author.username
  const urlUser = author.image || defaultUserLogo

  return (
    <div className={styles.articleCard}>
      <div className={styles.articleContent}>
        <div className={styles.wrapper}>
          <h3>{title}</h3>
          <div className={styles.articleLikes} aria-label="likes">
            <TransparentHeart
              filled={liked}
              onClick={(event) => {
                if (isAuthenticated) {
                  handleLikeClick(event)
                } else {
                  event.stopPropagation() // Останавливаем всплытие события
                  window.alert('Please login to like this article')
                }
              }}
            />
            <span>{favoritesCount}</span>
          </div>
        </div>
        <div className={styles.articleTags}>{tagListElements}</div>
        <p className={styles.articleDescription} style={style}>
          {description}
        </p>
      </div>
      <div className={styles.articleMeta}>
        <div className={styles.wrapperMeta}>
          <div className={styles.authorName}>{authorName}</div>
          <div className={styles.publishDate}>{formattedDate}</div>
        </div>
        <img src={urlUser} alt="Avatar" className={styles.avatar} />
      </div>
    </div>
  )
}

export default ArticleCard
