import axios from 'axios'

axios.defaults.baseURL = 'https://webstore-backend.onrender.com/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-auth-token'] = localStorage.getItem('token') ?? null

function setJwt(jwt: string | null) {
  if (jwt) axios.defaults.headers.common['X-auth-token'] = jwt
}

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    try {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      if (!expectedError) {
        console.log('Logging the error', error)
      }
    } catch (error) {
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

export const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt: setJwt,
}
