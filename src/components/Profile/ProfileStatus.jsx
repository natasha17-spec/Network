import React from 'react';
import s from './Profile.module.css';

class ProfileStatus extends React.Component {


    state = {
        editMode: false,
        status: this.props.status
    };

    activeEditMode=() => {
        this.setState({
            editMode: true
        })
    };

    deactiveEditMode =() => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status)
    };

    onStatusChange=(e)=>{
        this.setState({
            status:e.currentTarget.value
        })

    };

    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div className={s.nameStatus}>
                        <span onDoubleClick={this.activeEditMode}>
                            {this.props.status || 'No status'}
                        </span>
                    </div>
                }
                {this.state.editMode &&
                    <div className={s.containerInput}>
                        <input
                            onChange={this.onStatusChange} autoFocus={true}
                               onBlur={this.deactiveEditMode}
                               value={this.state.status}/>
                    </div>
                }
            </>
        );
    };
}

export default ProfileStatus;