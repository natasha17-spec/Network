import React from 'react';
import s from './Greeting.module.css';

class Greeting extends React.Component {

    render() {

        return (
            <div >
                <div className={s.greeting_photo} > </div>
                <h1>Welcome to the Social Network!</h1>
            </div>
        )
    }
}

export default Greeting;

