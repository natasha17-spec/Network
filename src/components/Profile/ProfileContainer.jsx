import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
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
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId)
    }

    render() {

        return (
            <Profile {...this.props}
                     updateStatus={this.props.updateStatus}
                     status={this.props.status}
                     profile={this.props.profile}
                     fullName={this.props.fullName}
                     aboutMe={this.props.aboutMe}
                     lookingForAJob={this.props.lookingForAJob}
                     lookingForAJobDescription={this.props.lookingForAJobDescription}
            />
        );
    }
}

let mapStateToProps = (state) => ({
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
            getStatus,
            updateStatus,
            getUserProfile,
            setFullnameProfile,
            setAboutMeProfile,
            setlookingForAJobProfile,
            setlookingForAJobDescriptionProfile}),
        withRouter,withAuthRedirect
    )
    (ProfileContainer);



