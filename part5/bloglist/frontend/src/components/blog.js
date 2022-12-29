import BlogDetails from "./BlogDetails"
import Togglable from "./Togglable"

const Blog = ({ blog, blogs, updateBlog, deleteBlog }) => (
    <div>
        {blog.title} by {blog.author}
        <Togglable buttonLabel='View' buttonLabel2='Hide'>
            <BlogDetails blog={blog} blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog}></BlogDetails>
        </Togglable>
    </div>
)

export default Blog