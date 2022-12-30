import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogDetails from '../components/BlogDetails'

describe('<BlogDetails />', () => {
    let container
    let likes = 0
    const dummy = () => {
        return null
    }
    const dummyLikes = () => { likes++ }
    const updateBlog = dummyLikes
    const deleteBlog = dummy
    const blog = {
        title: 'Testing Blog',
        author: 'Test Class',
        url: 'www.google.com',
        likes: 10
    }

    beforeEach(() => {
        likes = 0
        container = render(
            <BlogDetails
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}>
            </BlogDetails>
        ).container
    })
    test('blogdetails is rendered', async () => {
        const element = await screen.queryByTestId(blog.title)
        expect(element)
    })

    test('like-button clicks registering ok', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('Like')
        await user.click(button)
        await user.click(button)
        expect(likes === 2)
    })
})