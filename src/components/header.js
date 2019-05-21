import React, { useContext } from 'react';
import AuthContext from './authContext';
const header = (props) => {
    const auth = useContext(AuthContext);

    return (
        <>
        {auth.status?<button onClick={props.todoHandle}>Todo</button>:null}
        | <button onClick={props.authHandle}>Auth</button>
        </>
    );
}

export default header;