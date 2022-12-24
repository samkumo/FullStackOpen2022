const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const mostLikes = (blogs) => {
    const likes = _(blogs)
        .groupBy('author')
        .map((blog, author) => ({
            author: author,
            likes: _.sumBy(blog, 'likes')
        })).value()
    return JSON.stringify(_.maxBy(likes, 'likes'))
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

module.exports = { dummy, totalLikes, mostLikes, favoriteBlog, mostBlogs }