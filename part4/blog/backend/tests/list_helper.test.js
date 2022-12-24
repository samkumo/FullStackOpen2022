const listHelper = require('../utils/list_helper')

describe('listHelper', () => {
    //
    // Test data
    //
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
        likes: 9,
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
    const mostLikes = {
        author: 'Jane',
        likes: 9
    }

    //
    // Tests
    //
    test('dummy returns one', () => {
        expect(listHelper.dummy(testBlogs)).toBe(1)
    })
    test('sum of likes', () => {
        expect(listHelper.totalLikes(testBlogs)).toBe(18)
    })
    test('most likes', () => {
        expect(listHelper.mostLikes(testBlogs)).toBe(JSON.stringify(mostLikes))
    })
    test('favorite blog', () => {
        expect(listHelper.favoriteBlog(testBlogs)).toBe(testBlogs[2])
    })
    test('most blogs', () => {
        expect(listHelper.mostBlogs(testBlogs)).toBe(JSON.stringify(mostBlogs))
        console.log('Most blogs:', mostBlogs);
    })
})