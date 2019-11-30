import React from 'react';
import s from './MyPosts.module.css'
import Posts from "./Posts/Posts";
import {addPostActionCreator, updateNewPostActionCreator} from "../../../Redux/profileReducer";



const MyPosts = (props) => {

    let postsElements =
        props.posts.map(post => <Posts
            message={post.message}
            likesCount = {post.likesCount}/>);

    let newPostElement = React.createRef();

    let addPost = () => {

         props.dispatch(addPostActionCreator());
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch(updateNewPostActionCreator(text))
    };

    return (
        <div className={s.myPosts}>
            <div>
                <h3>My Posts</h3>
            </div>
            <div>
                <textarea ref={newPostElement}
                                value={props.newPostText}
                          onChange={onPostChange} />
            </div>
            <div>
                <button onClick={addPost}>Add Post</button>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
};
export default MyPosts;