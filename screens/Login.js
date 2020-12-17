import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from 'react-native'
import { login } from '../store/index'
import { useDispatch, useSelector } from 'react-redux'

function Login({ navigation }) {
  const [nik, setNik] = useState('')
  const [name, setName] = useState('')

  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.isLoggedIn)

  function onChangeScreen() {
    dispatch(
      login({
        nik: nik,
        name: name
      })
    )
    setNik('')
    setName('')
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Dashboard')
    }
  }, [isLoggedIn])

  const handlingNik = (text) => {
    setNik(text)
  }

  const handlingName = (text) => {
    setName(text)
  }

  return (
    <View style={styles.container}>
      <View style={styles.LoginCard}>
        <Image
          source={require('../assets/logo.png')}
          style={{ marginBottom: 10, alignSelf: 'center' }}
        />
        <Text style={{ alignSelf: 'center', marginBottom: 10 }}>
          Input Your Identity
        </Text>
        <View style={styles.inputForm}>
          <TextInput
            placeholder="NIK"
            keyboardType="number-pad"
            onChangeText={(text) => handlingNik(text)}
          />
        </View>
        <View style={styles.inputForm}>
          <TextInput
            placeholder="Full name"
            onChangeText={(text) => handlingName(text)}
          />
        </View>
        <View style={styles.sectionBtn}>
          <TouchableOpacity style={styles.loginBtn} onPress={onChangeScreen}>
            <Text style={{ color: '#ffffff' }}>Check Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  LoginCard: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#99AAAB',
    padding: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    elevation: 10
  },
  inputForm: {
    width: 250,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    color: '#ffffff',
    padding: 8,
    borderStyle: 'solid',
    borderColor: '#99AAAB',
    borderWidth: 1,
    borderRadius: 10
  },
  sectionBtn: {
    width: 250
  },
  loginBtn: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#26ae60',
    alignItems: 'center',
    borderRadius: 10
  }
})

export default Login
