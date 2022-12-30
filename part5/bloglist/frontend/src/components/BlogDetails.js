import '../App.css'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog, updateBlog, deleteBlog }) => {

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
            <button className='likeButton' type='button' onClick={likeBlog}>Like</button><br />
            <button className='deleteButton' type='button' onClick={deleteB}>Delete</button>
        </div>
    )
}
BlogDetails.propTypes = {
    blog: PropTypes.object.isRequired,
    blogs: PropTypes.array,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}
export default BlogDetails