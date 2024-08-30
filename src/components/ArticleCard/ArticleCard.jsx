import React, { memo, useCallback } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import {
  favoriteArticle,
  unfavoritedArticle,
} from '../../store/actions/articlesActions'

// eslint-disable-next-line import/order
import defaultUserLogo from './user_logo.svg'

// eslint-disable-next-line import/order
import styles from './ArticleCard.module.scss'

// eslint-disable-next-line react/display-name
const LikeButton = memo(({ slug, favorited, favoritesCount }) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const isLiked = favorited

  const handleLikeClick = useCallback(() => {
    if (isLiked) {
      dispatch(unfavoritedArticle(slug))
    } else {
      dispatch(favoriteArticle(slug))
    }
  }, [dispatch, isLiked, slug])

  const handleHeartClick = useCallback(
    (event) => {
      // event.preventDefault()
      // event.stopPropagation()
      if (isAuthenticated) {
        handleLikeClick()
      } else {
        window.alert('Please login to like this article')
      }
    },
    [isAuthenticated, handleLikeClick],
  )

  return (
    <div className={styles.articleLikes} aria-label="likes">
      <Button
        icon={
          isLiked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />
        }
        onClick={handleHeartClick}
        style={{
          border: 'none',
          background: 'none',
          width: '16px',
          height: '16px',
        }}
      />
      <span>{favoritesCount}</span>
    </div>
  )
})

const ArticleCard = memo(function ArticleCard(props) {
  const {
    slug = null,
    title = 'Untitled',
    description = 'No description available',
    updatedAt = new Date().toISOString(),
    tagList = [],
    author = {
      username: 'Anonymous',
      image: defaultUserLogo || defaultUserLogo,
    },
    favorited = false,
    favoritesCount = 0,
  } = props.article
  const headerState = props.headerState
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
    <div className={styles.articleCardLink}>
      <div className={styles.articleCard}>
        <div className={styles.articleContent}>
          <div className={styles.wrapper}>
            {headerState ? (
              <Link className={styles.link} to={`/articles/${slug}`}>
                <h3>{title}</h3>
              </Link>
            ) : (
              <h3>{title}</h3>
            )}
            <LikeButton
              slug={slug}
              favorited={favorited}
              favoritesCount={favoritesCount}
            />
          </div>
          <div className={styles.articleTags}>{tagListElements}</div>
          {headerState ? (
            <p className={styles.articleDescription}>{description}</p>
          ) : (
            <p className={styles.articleDescriptionGrey}>{description}</p>
          )}
        </div>
        <div className={styles.articleMeta}>
          <div className={styles.wrapperMeta}>
            <div className={styles.authorName}>{authorName}</div>
            <div className={styles.publishDate}>{formattedDate}</div>
          </div>
          <img src={urlUser} alt="Avatar" className={styles.avatar} />
        </div>
      </div>
    </div>
  )
})

export default ArticleCard
