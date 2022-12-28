import '../App.css'
import blogService from '../services/blogs'

const BlogDetails = ({ blog, blogs }) => {
    const likeBlog = async (event) => {
        event.preventDefault()
        blog.likes++
        const response = await blogService.update(blog.id, blog)
        console.log(JSON.stringify(response));
    }

    return (
        <div className='blogDetails'>
            Title: {blog.title}<br />
            Author: {blog.author}<br />
            URL: {blog.url}<br />
            Likes: {blog.likes}
            <button type='button' onClick={(blog) => likeBlog(blog)}>Like</button>
        </div>
    )
}
export default BlogDetails