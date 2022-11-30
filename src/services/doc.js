import axios from 'axios'
const baseUrl = '/api/docs'

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

const get = (id) => {
    const request = axios.get(`${ baseUrl }/${id}`)
    return request.then(response => response.data)
  }

const create = async (newObject) => {
    const config = {
      headers: {"Authorization": token, 
        "Content-Type": 'multipart/form-data'},
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${ baseUrl }/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${ baseUrl }/${id}`)
    return request.then(response => response.data)
}

export default { get, getAll, create, update, remove, setToken, getToken }
