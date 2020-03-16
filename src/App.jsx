import React from 'react';
import './App.css';
import URL from "./components/Navbar/URL/URL";
import {Route, withRouter} from "react-router-dom";
import News from "./components/Navbar/News/News";
import Music from "./components/Navbar/Music/Music";
import Settings from "./components/Navbar/Settings/Settings";
import UsersContainer from "./users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";

const DialogsContainer = React.lazy(() => import('./components/Navbar/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

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

                <div className='null'></div>
                <HeaderContainer/>
                <URL state={this.props.state}/>
                <div className='app-wrapper-content'>

                    <Route path='/dialogs'
                           render={() =>{
                              return <React.Suspense fallback={<Preloader/>}>
                               <DialogsContainer/>
                                   </React.Suspense>
                              }}/>
                    <Route path='/profile/:userId?'
                           render={() => {
                               return <React.Suspense fallback={<Preloader/>}>
                               <ProfileContainer/>
                               </React.Suspense>
                           }}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
                <div className='null2'></div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose (withRouter,connect
(mapStateToProps, {initializeApp})) (App);

