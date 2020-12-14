import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
    isLoggedIn: false,
    record: []
}  

export function login(input) {

    return (dispatch) => {
        fetch('http://localhost:3000/patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {
            dispatch({ type: 'login_patient', payload: data.access_token })
        })
    }
}

export function readRecord() {
    const access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch('http://localhost:3000/patient', {
            method: 'GET',
            headers: {
                access_token: access_token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {
            dispatch({ type: 'get_record', payload: data })
        })
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'login_patient':
            localStorage.setItem('access_token', action.payload)
            return {...state, isLoggedIn: true}
        case 'get_record':
            return { ...state, record: action.payload }
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store