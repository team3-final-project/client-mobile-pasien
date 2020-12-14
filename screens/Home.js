import React, { useEffect, useState } from 'react'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { readRecord } from '../store/index'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

function Home({ route }) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readRecord())
  }, [])
  
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .catch((err) => console.log(err))
  }, [])
  console.log(expoPushToken, 'di Console Log')
  async function registerForPushNotificationsAsync() {
    let token
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      )
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
    } else {
      alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }
    return token
  }

  const { patientData } = useSelector((state) => state.record)

  if(!patientData) {
    return <p>loadingg...</p>
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Selamat Datang</Text>
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/man.png')}
            style={{ alignSelf: 'flex-start', width: 128 }}
          />
          <View style={styles.bio}>
            <Text style={styles.name}>{patientData.name}</Text>
            <Text style={styles.birthplace}>{patientData.email}</Text>
            <Text style={styles.birthplace}>{patientData.birth_date}</Text>
            <Text style={styles.address}>
              {patientData.address}
            </Text>
          </View>
        </View>
        <Text style={styles.medicalHeader}>Laporan Diagnosa Dokter</Text>
        {/* CARD FOR TEST SCROLL ONLY */}
        <View style={styles.reportCardSection}>
          {patientData.MedicalRecords.map(el => (
            <View style={styles.reportCard}>
              <Text>Diagnosa: {el.diagnose}</Text>
              <Text>Obat: {el.medicine_name}</Text>
              <Text>Dosis: {el.dosis}</Text>
              <Text>Jumlah obat: {el.jumlah_obat}</Text>
              <TouchableOpacity style={styles.detailBtn}>
                <Text style={{ color: '#fff', alignSelf: 'center' }}>Detail</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Text style={styles.medicalHeader}>Laporan Tes Anda</Text>
        <View style={styles.reportCardSection}>
          {patientData.HospitalRecords.map(el => (
            <View style={styles.reportCard}>
              <Text>{el.type_test}</Text>
              <Image source={{uri: el.file}}/>
              <Text>Tanggal: {el.date}</Text>
              <TouchableOpacity style={styles.detailBtn}>
                <Text style={{ color: '#fff', alignSelf: 'center' }}>Detail</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
  header: {
    fontSize: 36,
    alignSelf: 'flex-start',
    marginLeft: 20
  },
  profileSection: {
    flex: 1,
    width: 350,
    padding: 20,
    marginLeft: 20,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DAE0E2'
  },
  bio: {
    marginLeft: 10
  },
  name: {
    fontSize: 24,
    width: '70%'
  },
  birthplace: {
    width: 200,
    color: '#bdbdbd'
  },
  address: {
    width: 200,
    color: '#bdbdbd'
  },
  medicalHeader: {
    fontSize: 22,
    alignSelf: 'flex-start',
    marginLeft: 20
  },
  reportCardSection: {
    alignSelf: 'center',
    marginBottom: '5%'
  },
  reportCard: {
    marginTop: 10,
    backgroundColor: '#e6e6e6',
    color: '#ffff',
    width: 350,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#99AAAB',
    padding: 20
  },
  detailBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#26ae60',
    color: '#fff',
    borderRadius: 10,
    width: 80
  }
})

export default Home
