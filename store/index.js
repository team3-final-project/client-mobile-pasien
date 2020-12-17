import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  isLoggedIn: false,
  record: [],
  nutritions: [],
  exercises: []
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
    fetch('http://192.168.43.137:3000/patient', {
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

export function readNutrition(query) {
  return (dispatch) => {
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      headers: {
        'x-app-id': '0b3f19c1',
        'x-app-key': '3bccb2bf4eb86039bfe2a703490f26f8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query})
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
      })
      .then((data) => {
        console.log(data, '<<daataNutritions');
        dispatch({ type: 'get_nutrition', payload: data.foods })
      })
  }
}

export function readExercise(query) {
  return (dispatch) => {
    fetch('https://trackapi.nutritionix.com/v2/natural/exercise', {
      method: 'POST',
      headers: {
        'x-app-id': '15f77b03',
        'x-app-key': 'ec1ba99dbd6a57054dcc5e6a76b63b62',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query})
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
      })
      .then((data) => {
        dispatch({ type: 'get_exercise', payload: data.exercises })
      })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login_patient':
      return { ...state, isLoggedIn: true }
    case 'get_record':
      return { ...state, record: action.payload }
    case 'get_nutrition':
      return { ...state, nutritions: action.payload}
    case 'get_exercise':
      return { ...state, exercises: action.payload }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
