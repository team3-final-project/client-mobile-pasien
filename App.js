import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, Home } from './screens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Login} />
        <Stack.Screen name="Dashboard" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
