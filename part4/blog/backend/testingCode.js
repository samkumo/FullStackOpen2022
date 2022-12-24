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
    likes: 1,
    __v: 0
},
{
    _id: 3,
    title: "Jane's blog",
    author: "Jane",
    url: "www.gmail.com",
    likes: 4,
    __v: 0
},
{
    _id: 4,
    title: "Bob Blog the Second",
    author: "Bob",
    url: "www.gmail.com",
    likes: 6,
    __v: 0
},
{
    _id: 5,
    title: "Jane's blog",
    author: "Jane",
    url: "www.gmail.com",
    likes: 4,
    __v: 0
},
]
const mostBlogs = {
    author: 'Bob',
    blogs: 2
}
const mostLikes = {
    author: 'Jane',
    likes: 8
}

const mostLiked = _.maxBy(testBlogs, 'likes')
const grouped = _.groupBy(testBlogs, 'author')
console.log(grouped);

const sum = _(testBlogs)
    .groupBy('author')
    .map((blog, author) => ({
        author: author,
        likes: _.sumBy(blog, 'likes')
    })).value()
console.log(sum);
console.log(_.maxBy(sum, 'likes'));