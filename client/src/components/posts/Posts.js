/*eslint-disable*/
import React, { Fragment, useEffect } from 'react';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';



const Posts = () => {
    const {posts, loading} = useSelector(state => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [getPosts]);
    
   
    
    return (
    loading ? <Spinner /> : (<Fragment>
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
            <i className='fas fa-user'></i> Welcome to the community
        </p>
        <PostForm />
        <div className='posts'>
            {posts.map(post => <PostItem key={post._id} post={post} showActions={true}/>)}
        </div>
    </Fragment>)
  );
};

export default Posts;
