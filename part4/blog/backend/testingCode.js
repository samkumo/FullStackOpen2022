const _ = require('lodash')

const testBlogs = [{
    _id: 1,
    title: "My first blog",
    author: "John",
    url: "www.google.com",
    likes: 3,
    __v: 0
},
{
    _id: 2,
    title: "Bob blog",
    author: "Bob",
    url: "www.gmail.com",
    likes: 2,
    __v: 0
},
{
    _id: 3,
    title: "Jane's blog",
    author: "Jane",
    url: "www.gmail.com",
    likes: 3,
    __v: 0
},
{
    _id: 4,
    title: "Bob Blog the Second",
    author: "Bob",
    url: "www.gmail.com",
    likes: 4,
    __v: 0
}
]
const mostBlogs = {
    author: 'Bob',
    blogs: 2
}

const blogCounts = _.countBy(testBlogs, 'author')
console.log(blogCounts)
const maxKey = _.maxBy(_.keys(blogCounts), function (obj) {
    return blogCounts[obj]
})
console.log(blogCounts[maxKey]);
