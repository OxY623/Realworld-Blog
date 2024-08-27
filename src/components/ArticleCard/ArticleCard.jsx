import React from 'react'
// import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import styles from './ArticleCard.module.scss'
import TransparentHeart from './TransparentHeart'
import defaultUserLogo from './user_logo.svg'

const liked = false // Пока без регистрации

const ArticleCard = (props) => {
  const article = props.article || {}

  const {
    title = 'Untitled',
    description = 'No description available',
    updatedAt = new Date().toISOString(),
    tagList = [],
    author = { username: 'Anonymous', image: defaultUserLogo },
    favoritesCount = 0,
  } = article
  const { style } = props

  const dateUpdated = new Date(updatedAt)
  const formattedDate = format(dateUpdated, 'MMMM d, yyyy')
  const tagListElements = tagList.map((tag, index) => (
    <span key={index} className={styles.tag}>
      {tag}
    </span>
  ))

  const authorName = author.username
  const urlUser = author.image

  return (
    // eslint-disable-next-line no-undef
    <div className={styles.articleCard}>
      <div className={styles.articleContent}>
        <div className={styles.wrapper}>
          {/* Используем Link для навигации */}
          {/*<Link*/}
          {/*  to={`/articles/${article.slug}`}*/}
          {/*  className={styles.articleTitle}*/}
          {/*>*/}
          <h3>{title}</h3>
          {/*</Link>*/}
          <div className={styles.articleLikes} aria-label="likes">
            <TransparentHeart
              filled={liked}
              onClick={() => window.alert('Liked')}
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
