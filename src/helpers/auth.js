import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const setTokenInLocalStorage = token => {
  window.localStorage.setItem('IllumeJwtToken', token)
  setAxiosAuthorizationHeader(token)
}

export const removeTokenFromLocalStorage = () => {
  window.localStorage.removeItem('IllumeJwtToken')
  setAxiosAuthorizationHeader(null)
}

export const setAxiosAuthorizationHeader = token => {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.authorizaton
  }
}

export const verifyUser = commit => {
  const token = window.localStorage.getItem('IllumeJwtToken')
  if (token) {
    setAxiosAuthorizationHeader(token)
    try {
      const user_id = jwt_decode(token).user_id
      axios.get(`api/users/${user_id}`).then(response => {
        commit('setCurrentUser', response.data.user)
      })
    } catch (error) {
      window.localStorage.removeItem('IllumeJwtToken')
      commit('setCurrentUser', null)
      console.log(error)
    }
  }
}
