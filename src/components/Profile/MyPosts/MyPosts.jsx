import React from 'react';
import s from './MyPosts.module.css'
import Posts from "./Posts/Posts";
import {Field, Form, reduxForm} from "redux-form";

const MyPosts = (props) => {
    let postsElements =props.posts.map(post =><Posts message={post.message} likesCount = {post.likesCount}/>);
    let newPostElement = React.createRef();
    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    };
    // let onPostChange = () => {
    //     let text = newPostElement.current.value;
    //    props.updateNewPostText(text);
    //       };
    return (
        <div className={s.myPosts}>
            <div className={s.postsContainer}>
                <h3>My Posts</h3>
            </div>
            <addNewPostForms onSabmit={onAddPost}/>
            <div>
                {postsElements}
            </div>
        </div>
    );
};

const addNewPostForm = (props)=>{
   return(

       <Form onSabmit={props.handleSubmit}>
                <Field component='textarea'  name='newPostText'/>
           <div>
               <button>Add Post</button>
           </div>
       </Form>
   )
};
const addNewPostForms = reduxForm ({form:'ProfileaddNewPostForm'})(addNewPostForm);
export default MyPosts;