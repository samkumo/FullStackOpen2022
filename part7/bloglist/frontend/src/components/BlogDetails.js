import '../App.css'
import PropTypes from 'prop-types'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { connect, useDispatch } from 'react-redux'

const BlogDetails = (props) => {
    const dispatch = useDispatch()

    const likeBlog = (event) => {
        event.preventDefault()
        const newObj = structuredClone(props.blog)
        newObj.likes++
        props.updateBlog(newObj)
    }

    const deleteB = (event) => {
        event.preventDefault()
        dispatch(deleteBlog(props.blog))
    }

    return (
        <div className='blogDetails' id='blogDetails'>
            Title: {props.blog.title}<br />
            Author: {props.blog.author}<br />
            URL: {props.blog.url}<br />
            Likes: {props.blog.likes}
            <button id='like-button' className='likeButton' type='button' onClick={(e) => likeBlog(e)}>Like</button><br />
            <button id='delete-button' className='deleteButton' type='button' onClick={(e) => deleteB(e)}>Delete</button>
        </div>
    )
}
BlogDetails.propTypes = {
    blog: PropTypes.object.isRequired,
    blogs: PropTypes.array,
    //  updateBlog: PropTypes.func.isRequired,
    //   deleteBlog: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
    return { blogs: state.blogs }
}
const mapDispatchToProps = {
    updateBlog,
    deleteBlog,
}
const ConnectedBlogDetails = connect(mapStateToProps, mapDispatchToProps)(BlogDetails)
export default ConnectedBlogDetails