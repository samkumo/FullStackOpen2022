import { connect, useDispatch } from 'react-redux'
import { useState } from 'react'
import { login, logout } from '../reducers/userReducer'
import Togglable from './Togglable'
import BlogForm from '../components/BlogForm'

const LoginForm = (props) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = (event) => {
        event.preventDefault()
        const obj = { username: username, password: password }
        props.login(obj)
        window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(props.user))
    }
    const logoutUser = (event) => {
        event.preventDefault()
        props.logout()
        window.localStorage.removeItem('loggedBloglistAppUser')
    }
    if (props.user.token) {
        return (
            <div>
                <p>{props.user.name} logged in</p>
                <button onClick={(e) => logoutUser(e)} >Logout</button>
                <Togglable buttonLabel1='New blog' buttonLabel2='Cancel'>
                    <BlogForm></BlogForm>
                </Togglable>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={(e) => loginUser(e)}>
                    <div>
                        username
                        <input
                            id='username-input'
                            value={username}
                            onChange={({ target }) => { setUsername(target.value) }}

                        />
                    </div>
                    <div>
                        password
                        <input
                            id='password-input'
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button id='login-button' type="submit">login</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
}
const mapDispatchToProps = {
    logout,
    login,
}
const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default ConnectedLoginForm
/* const LoginForm =  ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        id='username-input'
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        id='password-input'
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id='login-button' type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    //  handleSubmit: PropTypes.func.isRequired,
    //  handleUsernameChange: PropTypes.func.isRequired,
    // handlePasswordChange: PropTypes.func.isRequired,
    //   username: PropTypes.string.isRequired,
    //  password: PropTypes.string.isRequired
}
export default LoginForm */