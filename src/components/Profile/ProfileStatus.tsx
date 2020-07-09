import React, {ChangeEvent} from 'react';
import s from './Profile.module.css';

type StateType = {
    editMode:boolean
    status:string
}
type PropsType = {
    status:string
    updateStatus:(newStatus:string)=>void
}

class ProfileStatus extends React.Component<PropsType,StateType> {

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

    onStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            status:e.currentTarget.value
        })

    };

    componentDidUpdate(prevProps:PropsType, prevState:StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div className={s.nameStatus}>
                        <blockquote>
                            <p className={s.status}><span onDoubleClick={this.activeEditMode}>
                            {this.props.status || 'No status'}
                        </span></p>
                        </blockquote>

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