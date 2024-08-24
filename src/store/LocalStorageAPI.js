const LocalStorageAPI = {
  save(key, value) {
    localStorage.setItem(key, value)
  },
  load(key) {
    return localStorage.getItem(key)
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  saveTokenMiddleware: (store) => (next) => (action) => {
    if (action.type === 'SET_TOKEN') {
      LocalStorageAPI.save('token', action.token)
    }
    return next(action)
  },
}
export default LocalStorageAPI
