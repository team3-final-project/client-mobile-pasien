import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, Home } from './screens'
import { Provider } from 'react-redux'
import store from './store/index'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Login} />
          <Stack.Screen name="Dashboard" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
