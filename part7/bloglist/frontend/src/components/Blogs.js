import Blog from './Blog'
import { connect } from 'react-redux'

const Blogs = (props) => {
    const blogs = [...props.blogs].sort((x, y) => y.likes - x.likes)
    return (
        <div id='blogs-div'>
            <h2>Blogs</h2>
            {blogs.map(blog =>
                <Blog
                    id='blog-item'
                    key={blog.id}
                    blog={blog}
                    updateBlog={props.updateBlog}
                    deleteBlog={props.deleteBlog}>
                </Blog>)
            }
        </div>)
}
const mapStateToProps = (state) => {
    return { blogs: state.blogs }
}
const ConnectedBlogs = connect(mapStateToProps)(Blogs)
export default ConnectedBlogs