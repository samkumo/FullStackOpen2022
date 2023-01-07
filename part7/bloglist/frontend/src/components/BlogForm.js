import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blog = {}
        blog.title = title
        blog.author = author
        blog.url = url
        setTitle('')
        setAuthor('')
        setUrl('')
        createBlog(blog)
    }
    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input
                        id='title-input'
                        type='text'
                        value={title}
                        name='Title'
                        onChange={({ target }) => setTitle(target.value)}>
                    </input><br />
                    Author:
                    <input
                        id='author-input'
                        type='text'
                        value={author}
                        name='Author'
                        onChange={({ target }) => setAuthor(target.value)}>
                    </input><br />
                    Url:
                    <input
                        id='url-input'
                        type='text'
                        value={url}
                        name='Url'
                        onChange={({ target }) => setUrl(target.value)}>
                    </input><br />
                </div>
                <button id='submitBlog-button' type='submit'>Create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func
}
export default BlogForm