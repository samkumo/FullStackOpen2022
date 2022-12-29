import { useState } from "react";

const BlogForm = ({ createBlog, updateBlog }) => {
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
                    <input type='text' value={title} name='Title'
                        onChange={({ target }) => setTitle(target.value)}>
                    </input><br />
                    Author:
                    <input type='text' value={author} name='Author'
                        onChange={({ target }) => setAuthor(target.value)}>
                    </input><br />
                    Url:
                    <input type='text' value={url} name='Url'
                        onChange={({ target }) => setUrl(target.value)}>
                    </input><br />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}
export default BlogForm