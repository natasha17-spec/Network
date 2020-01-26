import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    setAboutMeProfile,
    setFullnameProfile,
    setlookingForAJobDescriptionProfile,
    setlookingForAJobProfile,
} from "../../Redux/profileReducer";
import {Redirect, withRouter} from "react-router-dom";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
       if (!userId){
           userId=2;
       }
        this.props.getUserProfile(userId)
        }

    render() {

          return(
        <Profile {...this.props} profile={this.props.profile} fullName={this.props.fullName} aboutMe={this.props.aboutMe}
                 lookingForAJob={this.props.lookingForAJob} lookingForAJobDescription={this.props.lookingForAJobDescription}
        />
    );
}}
    let AuthRedirectComponent = (props)=>{
        if(!this.props.isAuth)return <Redirect to={'/login'}/>;
        return <ProfileContainer{...props}/>
    };

    let mapStateToProps=(state)=>({
    profile: state.profilePage.profile,
    fullName: state.profilePage.fullName,
    aboutMe:state.profilePage.aboutMe,
    lookingForAJob:state.profilePage.lookingForAJob,
    lookingForAJobDescription: state.profilePage.lookingForAJobDescription,
    isAuth:state.auth.isAuth
    });

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
export default connect (mapStateToProps,{getUserProfile, setFullnameProfile, setAboutMeProfile, setlookingForAJobProfile,setlookingForAJobDescriptionProfile

} ) (WithUrlDataContainerComponent);