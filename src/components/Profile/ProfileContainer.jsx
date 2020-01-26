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
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId)
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile} fullName={this.props.fullName}
                     aboutMe={this.props.aboutMe}
                     lookingForAJob={this.props.lookingForAJob}
                     lookingForAJobDescription={this.props.lookingForAJobDescription}
            />
        );
    }
}

    let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

    let mapStateToProps = (state) => ({
        profile: state.profilePage.profile,
        fullName: state.profilePage.fullName,
        aboutMe: state.profilePage.aboutMe,
        lookingForAJob: state.profilePage.lookingForAJob,
        lookingForAJobDescription: state.profilePage.lookingForAJobDescription,

    });

    let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
    export default connect(mapStateToProps, {
        getUserProfile, setFullnameProfile, setAboutMeProfile, setlookingForAJobProfile, setlookingForAJobDescriptionProfile

    })(WithUrlDataContainerComponent);