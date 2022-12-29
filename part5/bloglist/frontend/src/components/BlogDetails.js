import '../App.css'
import blogService from '../services/blogs'

const BlogDetails = ({ blog, blogs, updateBlog, deleteBlog }) => {
    /*     const likeBlog = async (event) => {
            event.preventDefault()
            blog.likes++
            const response = await blogService.update(blog.id, blog)
            console.log(JSON.stringify(response));
        } */

    const likeBlog = (event) => {
        event.preventDefault()
        blog.likes++
        updateBlog(blog)
    }

    const deleteB = (event) => {
        event.preventDefault()
        deleteBlog(blog)
    }

    return (
        <div className='blogDetails'>
            Title: {blog.title}<br />
            Author: {blog.author}<br />
            URL: {blog.url}<br />
            Likes: {blog.likes}
            <button type='button' onClick={likeBlog}>Like</button><br />
            <button type='button' onClick={deleteB}>Delete</button>
        </div>
    )
}
export default BlogDetails