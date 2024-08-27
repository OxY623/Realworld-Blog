import axios from 'axios'

import LocalStorageAPI from './LocalStorageAPI'

const API_URL = 'https://blog.kata.academy/api/'

export const formatData = (data) => {
  const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
    if (
      value !== null &&
      value !== undefined &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0) &&
      !(typeof value === 'object' && Object.keys(value).length === 0)
    ) {
      acc[key] = value
    }
    return acc
  }, {})

  return {
    user: {
      ...filteredData,
    },
  }
}

export const fetchCreateArticle = async (articleData) => {
  const token = LocalStorageAPI.load('token')

  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.post(
      `${API_URL}/articles`,
      { article: articleData },
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    throw error
  }
}

export const fetchUpdateArticle = async (slug, articleData) => {
  const token = LocalStorageAPI.load('token')

  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.put(
      `${API_URL}/articles/${slug}`,
      { article: articleData }, // Данные статьи обернуты в объект с ключом "article"
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    throw error
  }
}

export const fetchDeleteArticle = async (slug) => {
  const token = LocalStorageAPI.load('token')

  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.delete(`${API_URL}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  } catch (error) {
    throw error
  }
}

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
    return await axios.post(`${API_URL}/users`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    throw error
  }
}

export const fetchSignIn = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.post(`${API_URL}/users/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    throw error
  }
}

export const fetchUpdateProfile = (data) => {
  const token = LocalStorageAPI.load('token')
  // eslint-disable-next-line no-useless-catch
  try {
    return axios.put(`${API_URL}/user`, data, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    throw error
  }
}

export const getCurrentUser = async () => {
  const token = LocalStorageAPI.load('token')
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    throw error
  }
}

export const updateCurrentUser = async (data) => {
  console.log(data)
  const token = LocalStorageAPI.load('token')
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.put(`${API_URL}user`, data, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    throw error
  }
}
