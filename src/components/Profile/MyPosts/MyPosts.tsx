import React from 'react';
import s from './MyPosts.module.css';
import {PostType} from '../../../types/types';
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm";
import Post from "./Post/Post";


export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

export const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;
