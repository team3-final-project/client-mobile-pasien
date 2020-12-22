import React, { useEffect } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'
import { readRecord } from '../store/index'

function Diagnose() {
  const dispatch = useDispatch()
  const { patientData } = useSelector((state) => state.record)
  useEffect(() => {
    dispatch(readRecord())
  }, [])

  function btnDetailPress(link) {
    if (link == 'file') {
      alert('Invalid Link')
    } else {
      Linking.openURL(link)
    }
  }

  console.log(patientData)
  return (
    <ScrollView style={styles.container}>
      <View
        style={{ alignSelf: 'center', paddingTop: '10%', marginBottom: 10 }}>
        <Text style={styles.h1}>Your Test Result</Text>
      </View>
      <Image
        style={{ alignSelf: 'center', marginBottom: 10 }}
        source={require('../assets/magnifier-egk.png')}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap'
        }}>
        {patientData.HospitalRecords.map((el) => (
          <View style={styles.Card} key={el.id}>
            <Text style={styles.h2}>{el.type_test}</Text>
            <Text style={{ color: '#95afc0' }}>{el.date}</Text>
            <Image style={styles.stretch} source={{ uri: el.file }} />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => btnDetailPress(el.file)}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>
                Download
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    flex: 1,
    paddingHorizontal: '8%'
  },
  h1: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff'
  },
  h2: {
    fontSize: 20,
    fontWeight: '700'
  },
  Card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '45%',
    minHeight: '35%',
    padding: 10,
    marginVertical: 10
  },
  btn: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'stretch'
  },
  stretch: {
    marginVertical: 15,
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})
export default Diagnose
