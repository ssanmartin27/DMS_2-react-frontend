import axios from 'axios'
const baseUrl = '/api/txns'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getToken = () => {
    return token
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const getDate = () => {
    const request = axios.get(`${ baseUrl }/date`)
    return request.then(response => response.data)
  }

const get = (id) => {
    const request = axios.get(`${ baseUrl }/${id}`)
    return request.then(response => response.data)
  }


const create = async (newObject) => {
    const config = {
      headers: {"Authorization": token},
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id) => {
    const request = axios.patch(`${ baseUrl }/${id}`)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${ baseUrl }/${id}`)
    return request.then(response => response.data)
}

export default { get, getAll, getDate, create, update, remove, setToken, getToken }