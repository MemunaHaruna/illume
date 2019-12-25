// import Vue from 'vue'
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

export const verifyUserExists = commit => {
  const token = window.localStorage.getItem('IllumeJwtToken')
  if (token) {
    setAxiosAuthorizationHeader(token)
    const user_id = jwt_decode(token).user_id
    axios
      .get(`${process.env.VUE_APP_API_BASE_URL}api/users/${user_id}`)
      .then(response => {
        commit('setCurrentUser', response.data)
      })
      .catch(error => {
        window.localStorage.removeItem('IllumeJwtToken')
        commit('setCurrentUser', null)
        console.log(error)
      })
  }
}
