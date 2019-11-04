import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import URL from "./components/Navbar/URL/URL";
import {BrowserRouter, Route} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import News from "./components/Navbar/News/News";
import Music from "./components/Navbar/Music/Music";
import Settings from "./components/Navbar/Settings/Settings";
import Dialogs from "./components/Navbar/Dialogs/Dialogs";
import {apdateNewPostText} from "./Redux/State";



const App = (props) => {

    return (
            <div className='app-wrapper'>
                <Header/>
                <URL state={props.state.navBar}/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs
                        state={props.state.dialogsPage}
                    />}/>
                    <Route path='/profile' render={() => <Profile
                        state={props.state.profilePage}
                        addPost={props.addPost}
                        apdateNewPostText={props.apdateNewPostText}
                    />}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' c render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
    );
};

export default App;
