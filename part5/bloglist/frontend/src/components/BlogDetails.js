import '../App.css'

const BlogDetails = ({ blog }) => {
    return (
        <div className='blogDetails'>
            Title: {blog.title}<br />
            Author: {blog.author}<br />
            URL: {blog.url}<br />
            Likes: {blog.likes}
            <button type='button'>Like</button>
        </div>
    )
}
export default BlogDetails