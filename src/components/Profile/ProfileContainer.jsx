import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
    savePhoto,
    saveProfile,
    setAboutMeProfile,
    setFullnameProfile,
    setlookingForAJobDescriptionProfile,
    setlookingForAJobProfile,
    updateStatus,
} from "../../Redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
       if(this.props.match.params.userId != prevProps.match.params.userId){
           this.refreshProfile()
       }
    }

    render() {
        return (
            <Profile
                    {...this.props}
                     updateStatus={this.props.updateStatus}
                     status={this.props.status}
                     profile={this.props.profile}
                     fullName={this.props.fullName}
                     aboutMe={this.props.aboutMe}
                     lookingForAJob={this.props.lookingForAJob}
                     lookingForAJobDescription={this.props.lookingForAJobDescription}
                    isOwner={!this.props.match.params.userId}
                    savePhoto={this.props.savePhoto}

            />
        );
    }
}

let mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth,
    autorizedUserId:state.auth.id,
    status:state.profilePage.status,
    profile: state.profilePage.profile,
    fullName: state.profilePage.fullName,
    aboutMe: state.profilePage.aboutMe,
    lookingForAJob: state.profilePage.lookingForAJob,
    lookingForAJobDescription: state.profilePage.lookingForAJobDescription,
    state: state.profilePage.status
});

export default compose(
    connect(mapStateToProps, {
        saveProfile,
        getStatus,
        updateStatus,
        getUserProfile,
        setFullnameProfile,
        setAboutMeProfile,
        setlookingForAJobProfile,
        setlookingForAJobDescriptionProfile,
        savePhoto,
        }),
    withRouter,withAuthRedirect
)(ProfileContainer);



