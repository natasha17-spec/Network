import React, {useState} from 'react';
import s from './Profile.module.css';

const ProfileStatusWithHooks = (props) => {
   let [editMode, setEditMode] = useState(false);
   let [status, setStatus] = useState(props.status);
   // let stateWithSetState = useState(true);
   // let editMode = stateWithSetState[0];
   // let setEditMode = stateWithSetState[1];

    const activeEditMode = ()=>{
        setEditMode(true);
    }

   const deactiveEditMode =() => {
       setEditMode (false);
        props.updateStatus(status)
    };
    const onStatusChange = (e)=> {
        setStatus(e.currentTarget.value);
    }

    return (
        <>
            {!editMode &&
            <div className={s.nameStatus}>
                        <span onDoubleClick={activeEditMode}>{props.status || 'No status'}</span>
            </div>
            }
            {editMode &&
            <div className={s.containerInput}>
                <input onChange={onStatusChange}
                       autoFocus={true}
                       onBlur={deactiveEditMode}
                       value={status}

                />
            </div>
            }
        </>
    );
};


export default ProfileStatusWithHooks;