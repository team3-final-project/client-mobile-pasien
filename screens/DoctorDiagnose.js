import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
// import * as Linking from 'expo-linking'

import { readRecord } from '../store/index'

function DiagnoseDoc() {
  const dispatch = useDispatch()
  const { patientData } = useSelector((state) => state.record)
  useEffect(() => {
    dispatch(readRecord())
  }, [])

  function btnDetailPress(link) {
    console.log(link, '<<<< linkUrl');
    // if (link == 'file') {
    //   alert('Invalid Link')
    // } else {
    //   Linking.openURL(link)
    // }
  }

  console.log(patientData.MedicalRecords.length)

  return (
    <View style={styles.container}>
      <View
        style={{ alignSelf: 'center', paddingTop: '10%', marginBottom: 10 }}>
        <Text color={'#fff'} style={styles.h1}>
          Hasil Diagnosis Anda
        </Text>
      </View>
      <Image
        style={{ alignSelf: 'center', marginBottom: 10 }}
        source={require('../assets/scientist.png')}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap'
        }}>
        {patientData.MedicalRecords.length < 1 ? (
          <View style={styles.emptyContent}>
            <Image
              style={{
                alignSelf: 'center',
                marginBottom: 10,
                resizeMode: 'contain',
                width: 80
              }}
              source={require('../assets/like.png')}
            />
            <Text style={{ color: '#95afc0' }}>Belum ada laporan</Text>
          </View>
        ) : (
          patientData.MedicalRecords.map((el) => (
            <View style={styles.Card} key={el.id}>
              <Text style={styles.h2}>{el.medicine_name}</Text>
              <Text style={{ color: '#95afc0' }}>{el.dosis}</Text>
              <Text>Jumlah obat: {el.jumlah_obat}</Text>
              {/* <TouchableOpacity
                style={styles.btn}
                onPress={() => btnDetailPress(el.file)}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  Download
                </Text>
              </TouchableOpacity> */}
            </View>
          ))
        )}
      </View>
    </View>
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
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#fff',
    minHeight: '50%',
    borderRadius: 10
  }
})
export default DiagnoseDoc
