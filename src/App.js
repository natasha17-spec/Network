import React from 'react';
import './App.css';
import URL from "./components/Navbar/URL/URL";
import {Route} from "react-router-dom";
import News from "./components/Navbar/News/News";
import Music from "./components/Navbar/Music/Music";
import Settings from "./components/Navbar/Settings/Settings";
import DialogsContainer from "./components/Navbar/Dialogs/DialogsContainer";
import UsersContainer from "./users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App = (props) => {

    return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <URL  state={props.state}/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <DialogsContainer />}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer />}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music'  render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                </div>
            </div>
    );
};

export default App;
