import React, { useTransition } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
    let container
    let likes = 0
    let blogCreated = false
    const dummy = () => {
        return null
    }
    const blog = {
        title: 'Testing Blog',
        author: 'Test Class',
        url: 'www.google.com',
        likes: 10
    }
    const createBlog = (blog) => {
        if (blog) { blogCreated = true }
    }

    const addBlog = (event) => {
        // event.preventDefault()
        const blog = {
            title: 'Testing Blog',
            author: 'Test Class',
            url: 'www.google.com',
            likes: 10
        }
        //   setTitle('')
        //   setAuthor('')
        //  setUrl('')
        createBlog(blog)
    }


    beforeEach(() => {
        likes = 0
        blogCreated = false
        container = render(
            <BlogForm createBlog={createBlog}>
            </BlogForm>
        ).container
    })
    test('blogdetails is rendered', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('Create')
        await user.click(button)
        expect(blogCreated === true)
        //    const element = await screen.queryByTestId(blog.title)
        //   expect(element)
    })

})