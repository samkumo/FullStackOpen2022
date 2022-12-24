const listHelper = require('../utils/list_helper')

describe('listHelper', () => {
    const testBlogs = [{
        _id: 1,
        title: "My first blog",
        author: "Unknown author",
        url: "www.google.com",
        likes: 3,
        __v: 0
    },
    {
        _id: 2,
        title: "My second blog",
        author: "Known author",
        url: "www.gmail.com",
        likes: 5,
        __v: 0
    }
    ]

    test('dummy returns one', () => {
        expect(listHelper.dummy(testBlogs)).toBe(1)
    })
    test('sum of likes', () => {
        expect(listHelper.totalLikes(testBlogs)).toBe(8)
    })
})