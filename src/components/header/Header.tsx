import React from 'react';
import s from './Header.module.css';
import {Link, NavLink} from "react-router-dom";
import {Button, Col, Layout, Menu, Row} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectIsLogin} from "../../redux/auth-selector";
import {logout} from "../../redux/AuthReducer";



const Header: React.FC = () => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectIsLogin)
    const dispatch = useDispatch()




    const logoutCallBack = ()=>{
        dispatch(logout())
    }
    const {Header} = Layout;
    return <Header className="header">
        <div className="logo"/>
        <Row>
            <Col span={8}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="header_main">
                    <Menu.Item key="1"><Link to="/users"> Developers</Link></Menu.Item>
                </Menu>
            </Col>
            <Col span={16}>
                <Row>
                    <Col span={24} style={{display: 'flex',justifyContent: 'flex-end'}}>
                        {isAuth
                            ?
                            <div className={s.login}>
                                <Col span={10}><Avatar alt={login || ''}
                                                       src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/></Col>
                                <Col span={14}><Button type="primary" onClick={logoutCallBack}>Log out</Button></Col>
                            </div>
                            :
                            <Col>
                                <div>
                                    <Avatar>U</Avatar>
                                    <NavLink to={'/login'}>Login</NavLink>
                                </div>
                            </Col>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    </Header>

};
export default Header;