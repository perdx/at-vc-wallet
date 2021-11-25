import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(undefined);

const reducer = (state, action) => {
    if (action.type !== 'set') {
        throw new Error(`Unsupported action type dispatched to AuthProvider reducer: ${action.type}`);
    }
    return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
    };
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    const { state, dispatch } = context;

    const setAuth = isAuthenticated => {
        dispatch({ type: 'set', payload: { isAuthenticated } });
    };

    return { state, setAuth };
};

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, { isAuthenticated: false });
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
