import React from 'react';
import './App.css';
import Path from "./components/navbar/URL/Path";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import News from "./components/navbar/News/News";
import Music from "./components/navbar/music/Music";
import Settings from "./components/navbar/settings/Settings";
import UsersContainer from "./components/users/UsersContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/login/login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/App-reducer";
import Preloader from "./components/common/preloader/Preloader";

const DialogsContainer = React.lazy(() => import('./components/navbar/dialogs/DialogsContainer'));
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
                <Path state={this.props.state}/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route path='/dialogs'
                                   render={() => {
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
                        <Route path='/' render={() => <Redirect to={"/profile"}/>}/>
                        <Route path='*' render={() => <div>404 not found</div>}/>
                    </Switch>
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

