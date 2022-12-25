const Blog = require('../models/blog')

const initialBlogs = [{
    title: "My first blog",
    author: "John",
    url: "www.google.com",
    likes: 3,
},
{
    title: "Bob blog",
    author: "Bob",
    url: "www.gmail.com",
    likes: 2,
},
{
    title: "Jane's blog",
    author: "Jane",
    url: "www.gmail.com",
    likes: 9,
},
{
    title: "Bob Blog the Second",
    author: "Bob",
    url: "www.gmail.com",
    likes: 4,
}
]

//Returns and ID for blog that no longer exists in DB
const nonExistingId = async () => {
    const blog = new Blog({ title: 'DeletedBlog', author: 'None' })
    await blog.save()
    await blog.remove()
    return blog._id
}
//Return all blogs in DB
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb }