import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {authMe, logout, setAuthUserData} from "../../Redux/AuthReducer";

class HeaderContainer extends React.Component {

    componentDidMount = () => {

    this.props.authMe(this.props.id, this.props.email, this.props.login);

        //    usersAPI.authMe()
    //                .then(data => {
    //             if (data.resultCode === 0) {
    //                 let {id, login, email} = data.data;
    //                 this.props.setAuthUserData(id, email, login);
    //             }
    //         });
    };

    render() {
        return <Header {...this.props}/>

    }
}

    const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth,
    login: state.auth.login
    });


export default connect (mapStateToProps, {setAuthUserData, authMe, logout}) (HeaderContainer);