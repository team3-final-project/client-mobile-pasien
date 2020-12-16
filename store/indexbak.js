import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AsyncStorage } from 'react-native'

const initialState = {
    isLoggedIn: false,
    record: []
}  

export function login(input) {

    return (dispatch) => {
        fetch('http://192.168.43.137:3000/patient', {
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
            function setData(){ 
                return async (dispatch) => {
                    console.log('masuk sini cuyy')
                    const token = await AsyncStorage.setItem('access_token', JSON.stringify(data.access_token))
                }
            }
            dispatch({ type: 'login_patient'})
        })
    }
}

export function readRecord() {
    return async (dispatch) => {
        const access_token = await AsyncStorage.getItem('access_token')
        console.log(access_token)
         
        fetch('http://192.168.43.137:3000/patient', {
            method: 'GET',
            headers: {
                access_token: JSON.parse(access_token)
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
            return {...state, isLoggedIn: true}
        case 'get_record':
            return { ...state, record: action.payload }
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store