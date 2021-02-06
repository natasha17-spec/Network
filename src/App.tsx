import React from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";

import Login from "./components/login/login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/App-reducer";
import News from "./components/navbar/n4_News/News";
import Music from "./components/navbar/n3_Music/Music";
import Settings from "./components/navbar/n5_Settings/Settings";
import Path from "./components/navbar/n1_Path/Path";
import {AppStateType} from "./redux/redux-store";
import HeaderContainer from "./components/header/HeaderContainer";
import {withSuspense} from "./hoc/withSuspense";
import Preloader from "./components/common/preloader/Preloader";
import {UsersPage} from "./components/users/UsersPage";

const DialogsContainer = React.lazy(() => import('./components/navbar/n2_Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

let SuspendedDialogs = withSuspense(DialogsContainer)
let SuspendedProfile = withSuspense(ProfileContainer)

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandLedErrors = (e: PromiseRejectionEvent) => {
        alert('Some error accrued')
    }
    componentDidMount = () => {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandLedErrors)
    };
    componentWillMount = () => {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandLedErrors)
    };


    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (


            <div className='app-wrapper'>
                <div className='null'></div>
                <HeaderContainer/>


                <Path/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
                        <Route path='/dialogs'
                               render={() => <SuspendedDialogs/>}/>
                        <Route path='/profile/:userId?'
                               render={() => <SuspendedProfile/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersPage/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='*' render={() => <div>404 not found</div>}/>
                    </Switch>
                </div>
                <div className='null2'></div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});

export default compose<React.ComponentType>(withRouter, connect
(mapStateToProps, {initializeApp}))(App);

