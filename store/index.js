import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  isLoggedIn: false,
  record: []
}

export function login(input) {
  return (dispatch) => {
    fetch('http://192.168.43.188:3000/patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
      })
      .then(async (data) => {
        // console.log(data.access_token, '<<<data access token')
        await AsyncStorage.setItem('access_token', data.access_token)
        // function setData() {
        //   return async (dispatch) => {
        //     await AsyncStorage.setItem('access_token', data.access_token)
        //   }
        // }
        // const ab = await AsyncStorage.getItem('access_token')
        // console.log(ab, '<<<< ini token di storage');
        dispatch({ type: 'login_patient' })
      })
  }
}

export function readRecord() {
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem('access_token')
    fetch('http://192.168.43.188:3000/patient', {
      method: 'GET',
      headers: {
        access_token
          // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlrIjoiMTIzNDU2Nzg5IiwibmFtZSI6IlBhdGllbnQgMSIsImlhdCI6MTYwODAxNzg4MH0.qRjDisQmppTm0rrRjVCR3PVEJx1_Bqos-tIlU6OpHdA'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
      })
      .then((data) => {
        dispatch({ type: 'get_record', payload: data })
      })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login_patient':
      return { ...state, isLoggedIn: true }
    case 'get_record':
      return { ...state, record: action.payload }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
