import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {Link, Redirect, Route, Switch, withRouter} from "react-router-dom";

import {Login} from "./components/login/login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/App-reducer";
import News from "./components/navbar/n4_News/News";
import Music from "./components/navbar/n3_Music/Music";
import Settings from "./components/navbar/n5_Settings/Settings";
import {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import Preloader from "./components/common/preloader/Preloader";
import {UsersPage} from "./components/users/UsersPage";
import {Breadcrumb, Button, Layout, Menu} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import Header from "./components/header/Header";


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
        const {SubMenu} = Menu;
        const {Content, Footer, Sider} = Layout;
        return (

            <Layout>
               <Header/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                    <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developer">
                                    <Menu.Item key="5"><Link to="/users"> Users</Link></Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
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
                                <Route path='*' render={() => <div>
                                    <Button>OK</Button> 404 not found
                                </div>}/>
                            </Switch>


                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
            // <div className='app-wrapper'>
            //     <div className='null'></div>
            //     <HeaderContainer/>
            //
            //
            //     <Path/>
            //     <div className='app-wrapper-content'>
            //         <Switch>
            //             <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
            //             <Route path='/dialogs'
            //                    render={() => <SuspendedDialogs/>}/>
            //             <Route path='/profile/:userId?'
            //                    render={() => <SuspendedProfile/>}/>
            //             <Route path='/news' render={() => <News/>}/>
            //             <Route path='/music' render={() => <Music/>}/>
            //             <Route path='/settings' render={() => <Settings/>}/>
            //             <Route path='/users' render={() => <UsersPage/>}/>
            //             <Route path='/login' render={() => <Login/>}/>
            //             <Route path='*' render={() => <div>
            //             <Button>OK</Button>    404 not found
            //             </div>}/>
            //         </Switch>
            //     </div>
            //     <div className='null2'></div>
            // </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});

export default compose<React.ComponentType>(withRouter, connect
(mapStateToProps, {initializeApp}))(App);

