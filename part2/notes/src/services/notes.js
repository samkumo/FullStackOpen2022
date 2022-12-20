import axios from 'axios'
//const baseUrl = 'http://localhost:3001/notes'
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExist = {
    id: 99999,
    content: 'this note does not exist',
    date: '2019-05-30T17:30:31.098Z',
    importance: true,
  }
  return request.then((response) => response.data.concat(nonExist))
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseurl}/${id}`, newObject)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
}
