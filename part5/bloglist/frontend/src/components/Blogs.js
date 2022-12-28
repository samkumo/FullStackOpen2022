import Blog from "./Blog"

const Blogs = (props) => {
    props.blogs.sort((x, y) => y.likes - x.likes)
    return (
        <div>
            <h2>Blogs</h2>
            {props.blogs.map(blog =>
                <Blog key={blog.id}
                    blog={blog}
                    blogs={props.blogs} />)}
        </div>)
}
export default Blogs