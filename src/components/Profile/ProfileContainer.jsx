import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    setAboutMeProfile,
    setFullnameProfile,
    setlookingForAJobDescriptionProfile,
    setlookingForAJobProfile,
    setUserProfile
} from "../../Redux/profileReducer";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
       if (!userId){
           userId=2;
       }
       this.props.userId();

        }

    render() {
          return(
        <Profile {...this.props} profile={this.props.profile} fullName={this.props.fullName} aboutMe={this.props.aboutMe}
                 lookingForAJob={this.props.lookingForAJob} lookingForAJobDescription={this.props.lookingForAJobDescription}
        />
    );
}}

    let mapStateToProps=(state)=>({
    profile: state.profilePage.profile,
    fullName: state.profilePage.fullName,
    aboutMe:state.profilePage.aboutMe,
    lookingForAJob:state.profilePage.lookingForAJob,
    lookingForAJobDescription: state.profilePage.lookingForAJobDescription
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect (mapStateToProps,{setUserProfile, setFullnameProfile, setAboutMeProfile, setlookingForAJobProfile,setlookingForAJobDescriptionProfile

} ) (WithUrlDataContainerComponent);