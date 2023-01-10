import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()

    const addBlog = (event) => {
        event.preventDefault()
        const blog = {}
        blog.title = title
        blog.author = author
        blog.url = url
        setTitle('')
        setAuthor('')
        setUrl('')
        //props.createBlog(blog)
        dispatch(createBlog(blog))
        props.setNotification('BLOG_ADDED', 5000)
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

const mapStateToProps = (state) => {
    return { blogs: state.blogs }
}
const mapDispatchToProps = {
    setNotification
}
BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func
}
const ConnectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm