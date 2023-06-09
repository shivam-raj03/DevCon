/*eslint-disable*/
import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = () => {
    const { post, loading } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getPost(id));
    }, []);

    return (
        loading ||  post === null ? <Spinner /> : 
        <Fragment>
            <Link to={'/posts'} className='btn'>
                Back to Posts
            </Link>
            <PostItem post={post} showActions={false}/>
            <CommentForm postId={id} />
            <div className='comments'>
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>
  )
}

export default Post;
