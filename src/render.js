import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {addPost, apdateNewPostText} from "./Redux/State";



export let rerenderEntireTree = (state) =>{
    ReactDOM.render(
        <BrowserRouter>
            <App state={state}
                 addPost={addPost}
                 apdateNewPostText={apdateNewPostText}
            />,
        </BrowserRouter>, document.getElementById('root'));
};


