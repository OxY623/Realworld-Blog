import axios from 'axios'

const API_URL = 'https://blog.kata.academy/api/'

export const fetchArticles = async (page = 1) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${API_URL}/articles`, {
      params: {
        limit: 5,
        offset: (page - 1) * 5,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchArticle = async (slug) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${API_URL}/articles/${slug}`)
    return response.data.article
  } catch (error) {
    throw error
  }
}

export const fetchSingUp = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.post('https://blog.kata.academy/api/users', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    throw error
  }
}

export const fetchSignIn = async (data, token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.post('https://blog.kata.academy/api/users/login', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    throw error
  }
}
