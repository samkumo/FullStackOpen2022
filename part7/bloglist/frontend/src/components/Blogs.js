import Blog from './Blog'

const Blogs = (props) => {
    props.blogs.sort((x, y) => y.likes - x.likes)
    return (
        <div id='blogs-div'>
            <h2>Blogs</h2>
            {props.blogs.map(blog =>
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
export default Blogs