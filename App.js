import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, Home, Diagnose, DoctorDiag } from './screens'
import { Provider } from 'react-redux'
import store from './store/index'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Login} />
          <Stack.Screen
            name="Dashboard"
            component={Home}
            options={{ headerLeft: () => null }}
          />
          <Stack.Screen name="Diagnose" component={Diagnose} />
          <Stack.Screen name="Report Doctor" component={DoctorDiag} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
