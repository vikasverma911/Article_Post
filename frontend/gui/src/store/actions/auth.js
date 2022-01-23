import axios from 'axios';
import * as actionTypes from './actionTypes';
import jwt_decode from 'jwt-decode';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/dj-rest-auth/login/', {
            username: username,
            password: password
        })
            .then(res => {
                const token = res.data;
                // console.log(token)
                // console.log(token.access_token)
                // console.log(token.user.email)
                localStorage.setItem('token', JSON.stringify(token));
                dispatch(authSuccess(token));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const updateToken = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return dispatch => {
        axios.post('http://127.0.0.1:8000/dj-rest-auth/token/refresh/', {
            Refresh: token.refresh_token
        })
            .then(res => {
                const acc_token = res.data.access_token;
                localStorage.setItem('token.access_token', JSON.stringify(acc_token));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
            .then(res => {
                const token = res.data;
                localStorage.setItem('token', JSON.stringify(token));
                console.log(token)
                dispatch(authSuccess(token));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token === null) {
            dispatch(logout());
        } else {
            // console.log(token.access_token)
            var decodedToken = jwt_decode(token.access_token, { complete: true });
            console.log(decodedToken.exp)
            var current_time = new Date().getTime() / 1000;
            if (decodedToken.exp <= current_time) {
                axios.post('http://127.0.0.1:8000/dj-rest-auth/token/refresh/', {
                    refresh: token.refresh_token
                })
                    .then(res => {
                        const tt = res.data;
                        console.log(token.access_token)
                        token.access_token = tt.access
                        console.log(token.access_token)
                        console.log(token)
                        localStorage.setItem('token', JSON.stringify(token));
                        dispatch(authSuccess(token));
                    })
                    .catch(err => {
                        dispatch(logout())
                    })
            } else {
                dispatch(authSuccess(token));
            }
        }
    }
}

// export const authCheckState = () => {
//     return dispatch => {
//         const token = JSON.parse(localStorage.getItem('token'));
//         if (token === null) {
//             dispatch(logout());
//         } else {
//             // console.log(token.access_token)
//             var decodedToken = jwt_decode(token.access_token, { complete: true });
//             console.log(decodedToken.exp)
//             var current_time = new Date().getTime() / 1000;
//             if (decodedToken.exp <= current_time) {
//                 dispatch(logout());
//             } else {
//                 axios.post('http://127.0.0.1:8000/dj-rest-auth/token/refresh/', {
//                     refresh: token.refresh_token
//                 })
//                     .then(res => {
//                         const tt = res.data;
//                         console.log(token.access_token)
//                         token.access_token = tt.access
//                         console.log(token.access_token)
//                         console.log(token)
//                         localStorage.setItem('token', JSON.stringify(token));
//                     })
//                 dispatch(authSuccess(token));
//             }
//         }
//     }
// }