import React from 'react';

export default ({onFetchAsync,onLogin,onLogout}) => {
    return (
        <div>
            <button onClick={onFetchAsync}>
                FetchAsync
            </button>
            {' '}
            <button onClick={onLogin}>
                Login
            </button>
            {' '}
            <button onClick={onLogout}>
                Logout
            </button>
        </div>
    );
};

