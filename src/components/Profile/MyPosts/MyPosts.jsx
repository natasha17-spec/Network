import React from 'react';
import s from './MyPosts.module.css'
import Posts from "./Posts/Posts";

const MyPosts = (props) => {

    let postsElements =
        props.posts.map(post => <Posts message={post.message} likesCount = {post.likesCount}/>)
    return (
        <div className={s.myPosts}>
            <div>
                <h3>My Posts</h3>
            </div>
            <div>
                <textarea></textarea>

            </div>
            <div className={s.addPost}>
                <button>Add Post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};
export default MyPosts;