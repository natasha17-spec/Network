import React from 'react';
import s from './Profile.module.css';

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    };

    activeEditMode() {
        this.setState({
            editMode: true
        })
    };

    deactiveEditMode() {
        this.setState({
            editMode: false
        })
    };

    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div className={s.nameStatus}>
                        <span onDoubleClick={this.activeEditMode.bind(this)}>
                            {this.props.status}
                        </span>
                    </div>
                }
                {this.state.editMode &&
                    <div className={s.containerInput}>
                        <input autoFocus={true}
                               onBlur={this.deactiveEditMode.bind(this)}
                               value={this.props.status}/>
                    </div>
                }
            </>
        );
    };
}

export default ProfileStatus;