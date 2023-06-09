/*eslint-disable*/
import axios from "../http";
import { setAlert } from "./alert";

import { DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT} from "./types";

//GET POSTS

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('api/posts');
        
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Add like

export const addLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`api/posts/like/${postId}`);
        //console.log(res);
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        });

    } catch (err) {
        //console.log(err);
        dispatch({
            type: POST_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Remove Like

export const removeLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`api/posts/unlike/${postId}`);
        //console.log(res);
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        });

    } catch (err) {
        //console.log(err);
        dispatch({
            type: POST_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

// delete post

export const deletePost = (postId) => async dispatch => {
    try {
        await axios.delete(`api/posts/${postId}`);
        //console.log(res);
        dispatch({
            type: DELETE_POST,
            payload: postId
        });

        dispatch(setAlert('Post Removed', 'success'));    
    } catch (err) {
        //console.log(err);
        dispatch({
            type: POST_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

// post post

export const addPost = (formData) => async dispatch => {
    try {
        const res = await axios.post('api/posts', formData);
        //console.log(res);
        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Added', 'success'));    
    } catch (err) {
        //console.log(err);
        dispatch({
            type: POST_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//GET POST

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`api/posts/${id}`);
        
        dispatch({
            type: GET_POST,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

// add comment

export const addComment = (postId, formData) => async dispatch => {
    try {
        const res = await axios.post(`api/posts/comment/${postId}`, formData);
        //console.log(res);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Added', 'success'));    
    } catch (err) {
        //console.log(err);
        dispatch({
            type: POST_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

// delete comment

export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`api/posts/comment/${postId}/${commentId}`);
        //console.log(res);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));    
    } catch (err) {
        console.log(err);
        dispatch({
            type: POST_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}