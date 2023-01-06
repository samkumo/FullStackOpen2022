import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const createNew = async (content) => {
    const obj = { content, votes: Number(0) }
    const res = await axios.post(baseUrl, obj)
    return res.data
}
const update = async (id, content) => {
    const res = await axios.put(`${baseUrl}/${id}`, content)
    return res.data
}
const addVote = async (id, newObj) => {
    console.log(newObj);
    const obj = { content: newObj.content, votes: newObj.votes + 1 }
    const res = await axios.put(`${baseUrl}/${id}`, obj)
    return res.data
}

export default { getAll, createNew, update, addVote }