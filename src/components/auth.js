import React, {useContext} from 'react';
import AuthContext from './authContext';

const auth = (props) => {
    const auth = useContext(AuthContext);
    return (
        <button onClick={auth.login} >Login</button>
    );
}

export default auth;