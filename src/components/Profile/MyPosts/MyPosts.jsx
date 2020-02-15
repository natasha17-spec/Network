import React from 'react';
import s from './MyPosts.module.css'
import Posts from "./Posts/Posts";
import {Field, reduxForm} from "redux-form";
import {maxLenghtCreator, required} from "../../../utils/validatos/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLenghtCreator(10);
const AddNewPostForm = (props)=>{
    return(
        <form onSubmit={props.handleSubmit}>
        <div>
            <Field name="newPostText" component={Textarea}
                   placeholder="Post message"
                   validate={[required, maxLength10]}/>
        </div>
        <div>
            <button>Add Post</button>
        </div>
    </form>
    )};
let AddNewPostFormRedux = reduxForm
({form:"ProfileAddNewPostForm"})(AddNewPostForm);

const MyPosts = (props) => {
    let postsElements =props.posts.map(post =>
        <Posts message={post.message} likesCount = {post.likesCount}/>);
    let newPostElement = React.createRef();

    let onAddPost = (values) => {
        debugger
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.myPosts}>
            <div className={s.postsContainer}>
                <h3>My Posts</h3>
            </div>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div>
                {postsElements}
            </div>
        </div>
    );
};
export default MyPosts;