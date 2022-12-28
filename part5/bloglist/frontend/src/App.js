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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()
  let flip = false


  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    }
    )
  }, [flip])
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
      <Blogs blogs={blogs} flip={flip}></Blogs>
    </div>
  )
}

export default App