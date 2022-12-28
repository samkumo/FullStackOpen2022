import BlogDetails from "./BlogDetails"
import Togglable from "./Togglable"

const Blog = ({ blog }) => (
    <div>
        {blog.title} by {blog.author}
        <Togglable buttonLabel='View' buttonLabel2='Hide'>
            <BlogDetails blog={blog}></BlogDetails>
        </Togglable>
    </div>
)

export default Blog