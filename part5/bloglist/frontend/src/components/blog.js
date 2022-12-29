import BlogDetails from './BlogDetails'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => (
    <div>
        {blog.title} by {blog.author}
        <Togglable buttonLabel='View' buttonLabel2='Hide'>
            <BlogDetails blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}></BlogDetails>
        </Togglable>
    </div>
)

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default Blog