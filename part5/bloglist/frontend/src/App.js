import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blog, setBlog] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    }
    )
  }, [blog])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
      console.log('Wrong credentials')
      setErrorMessage('Wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = (blogObject) => {
    blogService.create(blogObject)
      .then((returnedblog) => {
        setBlogs(blogs.concat(returnedblog))
      })
      .catch(error => console.log(error.message))
  }

  /*   const handleAddBlog = async (event) => {
      event.preventDefault()
      try {
        // const blog = { title: title, author: author, url: url }
        const body = {}
        body.title = title
        body.author = author
        body.url = url
        await blogService.create(body)
        setBlog({ title: title, author: author, url: url })
        setTitle('')
        setAuthor('')
        setUrl('')
        setSuccessMessage(`A new blog '${title}' by ${author} was added!`)
        setTimeout(() => { setSuccessMessage(null) }, 5000)
      } catch (error) {
        setBlog(null)
        console.log(error.message)
        setErrorMessage('Blog could not be added!')
        setTimeout(() => { setErrorMessage(null) }, 5000)
      }
    } */

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}>
          </LoginForm>
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }
  /*   const BlogForm = () => {
      return (
        <form onSubmit={handleAddBlog}>
          <h2>Add new blog:</h2>
          <div>
            Title:
            <input type='text' value={title} name='Title'
              onChange={({ target }) => setTitle(target.value)}>
            </input><br />
            Author:
            <input type='text' value={author} name='Author'
              onChange={({ target }) => setAuthor(target.value)}>
            </input><br />
            Url:
            <input type='text' value={url} name='Url'
              onChange={({ target }) => setUrl(target.value)}>
            </input><br />
          </div>
          <button type='submit'>Create</button>
        </form>
      )
    } */
  /*   const Blogs = (props) => {
      return (
        <div>
          <h2>Blogs</h2>
          {
            props.blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />)
          }
        </div>)
    } */

  return (
    <div>
      <h1>Application</h1>
      <Notification message={errorMessage} type='error'></Notification>
      <Notification message={successMessage} type='success'></Notification>
      {user === null
        ? loginForm()
        : <div><p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>Logout</button>
          <Togglable buttonLabel='New blog' buttonLabel2='Cancel' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>}
      <Blogs blogs={blogs}></Blogs>
    </div>
  )
}

export default App