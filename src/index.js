import React from 'react';
import * as serviceWorker from './serviceWorker';
import state, {subscribe} from "./Redux/State";
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {addPost, updateNewPostText} from "./Redux/State";



 let rerenderEntireTree = () =>{
 ReactDOM.render(
     <BrowserRouter>
      <App state={state}
           addPost={addPost}
           updateNewPostText={updateNewPostText}
      />,
     </BrowserRouter>, document.getElementById('root'));
};

rerenderEntireTree(state);
subscribe(rerenderEntireTree);
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
 serviceWorker.unregister();
