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
    /*     let container
        const dummy = () => {
            return null
        }
        const updateBlog = dummy
        const deleteBlog = dummy
        const blog = {
            title: 'Testing Blog',
            author: 'Test Class',
            url: 'www.google.com',
            likes: 10
        }
        const blogs = [{ blog }]
        const buttonLabel1 = 'View'
        const buttonLabel2 = 'Hide'
    
        beforeEach(() => {
            container = render(
                <Blog
                    blog={blog}
                    blogs={blogs}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}>
                    <Togglable
                        buttonLabel1={buttonLabel1}
                        buttonLabel2={buttonLabel2}>
                        <BlogDetails
                            blog={blog}
                            updateBlog={updateBlog}
                            deleteBlog={deleteBlog}>
                        </BlogDetails>
                    </Togglable>
                </Blog>).container
        })
        test('render blog title and author, info invisible', async () => {
            const elementTitle = await screen.queryByText(blog.title)
            const elementAuthor = await screen.queryByText(blog.author)
            expect(elementTitle)
            expect(elementAuthor)
            // screen.debug()
        })
        test('blog detail should be hidden by default', () => {
            const elementUrl = container.querySelector('.blogDetails')
            expect(elementUrl).not.toBeVisible()
            // screen.debug()
        })
        test('blog detail should be visible after SHOW button is clicked', async () => {
            const user = userEvent.setup()
            const button = screen.getByText(buttonLabel1)
            await user.click(button)
    
            const element = container.querySelector('.blogDetails')
            expect(element).toBeVisible()
            // screen.debug()
        }) */
})