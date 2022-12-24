const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((fav, current) => current.likes > fav.likes ? current : fav)
}
const mostBlogs = (blogs) => {
    const blogCounts = _.countBy(blogs, 'author')
    const author = _.maxBy(_.keys(blogCounts), function (o) {
        return blogCounts[o]
    })
    const mostBlogs = {
        author: author,
        blogs: blogCounts[author]
    }
    return JSON.stringify(mostBlogs)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }