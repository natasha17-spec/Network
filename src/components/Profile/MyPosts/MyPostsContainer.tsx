import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from '../../../redux/redux-store';
import {DispatchPropsType, MapPropsType,MyPosts} from "./MyPosts";
import {actions} from "../../../redux/ProfileReducer";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;
