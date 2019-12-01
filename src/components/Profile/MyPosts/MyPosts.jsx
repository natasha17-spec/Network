import React from 'react';
import s from './MyPosts.module.css'
import Posts from "./Posts/Posts";

const MyPosts = (props) => {
    let postsElements =props.posts.map(post =><Posts message={post.message}
                                                     likesCount = {post.likesCount}/>);
    let newPostElement = React.createRef();
    let onAddPost = () => {
        props.addPost();  };
    let onPostChange = () => {
        let text = newPostElement.current.value;
       props.updateNewPostText(text);
          };
    return (
        <div className={s.myPosts}>
            <div>
                <h3>My Posts</h3>
            </div>
            <div> <textarea ref={newPostElement}value={props.newPostText}
                            onChange={onPostChange}/></div>
            <div> <button onClick={onAddPost}>Add Post</button></div>
            <div>
                {postsElements}
            </div>
        </div>
    );
};
export default MyPosts;