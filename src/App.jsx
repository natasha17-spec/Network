import React from 'react';
import './App.css';
import URL from "./components/Navbar/URL/URL";
import {Route, withRouter} from "react-router-dom";
import News from "./components/Navbar/News/News";
import Music from "./components/Navbar/Music/Music";
import Settings from "./components/Navbar/Settings/Settings";
import DialogsContainer from "./components/Navbar/Dialogs/DialogsContainer";
import UsersContainer from "./users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";


class App extends React.Component {

    componentDidMount = () => {
        this.props.initializeApp();
    };
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }


        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <URL state={this.props.state}/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose (withRouter,connect
(mapStateToProps, {initializeApp})) (App);

