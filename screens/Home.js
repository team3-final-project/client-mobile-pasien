import React, { useEffect, useState, useRef } from 'react'
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
import firebase from '../firebase.js'

function Home({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  const dispatch = useDispatch()
  const db = firebase.firestore()

  useEffect(() => {
    dispatch(readRecord())
  }, [])

  // const parameterChange = async () => {
  //   console.log('masuk sini')
  //   let push = false

  //   await db
  //     .collection('med')
  //     .doc('h5mjuGm0apJBldX6fMc7')
  //     .get()
  //     .then((value) => {
  //       console.log(value.data())
  //       push = value.data().notification
  //       console.log(push, 'disini harusnya true')
  //     })

  //   console.log(push, '<<<<')

  //   if (push) {
  //     console.log('siap di push notif')
  //     newMedicalRecord(expoPushToken)
  //     dispatch(readRecord())
  //   }
  //   await db.collection('med').doc('h5mjuGm0apJBldX6fMc7').update({
  //     notification: false
  //   })
  // }

  // db.collection('med')
  //   .doc('h5mjuGm0apJBldX6fMc7')
  //   .onSnapshot((snapshot) => {
  //     console.log('berubah')
  //     parameterChange()
  //   })

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

  //   notificationListener.current = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       setNotification(notification)
  //     }
  //   )

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log(response)
  //     }
  //   )

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener)
  //     Notifications.removeNotificationSubscription(responseListener)
  //   }
  // }, [])

  const { patientData } = useSelector((state) => state.record)

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false
  //   })
  // })

  // async function newMedicalRecord(expoPushToken) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: 'default',
  //     title: 'Ada yang baru nih!',
  //     body: 'Diagnosamu sudah terbaharui!',
  //     data: { data: 'goes here' }
  //   }

  //   await fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(message)
  //   })
  // }

  // async function registerForPushNotificationsAsync() {
  //   let token
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(
  //       Permissions.NOTIFICATIONS
  //     )
  //     let finalStatus = existingStatus
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  //       finalStatus = status
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!')
  //       return
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data
  //     console.log(token)
  //   } else {
  //     alert('Must use physical device for Push Notifications')
  //   }

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C'
  //     })
  //   }

  //   return token
  // }

  if (!patientData) {
    return (
      <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  function navigateToHospitalCheck() {
    navigation.navigate('Diagnose')
  }

  function navigateToDocDiagnose() {
    navigation.navigate('Report Doctor')
  }

  function logout() {
    navigation.navigate('Welcome')
  }

  function navigateToMaps() {
    navigation.navigate('Maps')
  }

  function navigateToHealthyLife() {
    navigation.navigate('HealthyLife')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.nav}>
          <Text style={styles.header}>Selamat Datang</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/man.png')}
            style={{ alignSelf: 'flex-start', width: 128 }}
          />
          <View style={styles.bio}>
            <Text style={styles.name}>{patientData.name}</Text>
            <Text style={styles.birthplace}>{patientData.email}</Text>
            <Text style={styles.birthplace}>{patientData.birth_date}</Text>
            <Text style={styles.address}>{patientData.address}</Text>
          </View>
        </View>

        {/* CARD FOR TEST SCROLL ONLY */}
        <SafeAreaView>
          <ScrollView style={styles.bgCard}>
            <Text style={styles.medicalHeader}>Menu</Text>
            <View style={styles.reportCardSection}>
              {/* {patientData.MedicalRecords.map((el) => (
            <View style={styles.reportCard} key={el.id}>
              <Text>Diagnosa: {el.diagnose}</Text>
              <Text>Obat: {el.medicine_name}</Text>
              <Text>Dosis: {el.dosis} perhari</Text>
              <Text>Jumlah obat: {el.jumlah_obat}</Text>
              <TouchableOpacity style={styles.detailBtn}>
                <Text style={{ color: '#fff', alignSelf: 'center' }}>
                  Detail
                </Text>
              </TouchableOpacity>
            </View>
          ))} */}
              <TouchableOpacity
                style={styles.reportCard}
                onPress={navigateToDocDiagnose}>
                <Text style={styles.cardOption}>Laporan Diagnosa Dokter</Text>
                <Image
                  source={require('../assets/case-file.png')}
                  style={{ resizeMode: 'contain', width: 80, height: 80 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.reportCardSection}>
              {/* {patientData.HospitalRecords.map((el) => (
            <View style={styles.reportCard} key={el.id}>
              <Text>{el.type_test}</Text>
              <Image style={styles.stretch} source={{ uri: el.file }} />
              <Text>Tanggal: {el.date}</Text>
              <TouchableOpacity
                style={styles.detailBtn}
                onPress={() => btnDetailPress(el.file)}>
                <Text style={{ color: '#fff', alignSelf: 'center' }}>
                  Detail
                </Text>
              </TouchableOpacity>
            </View>
          ))} */}
              <TouchableOpacity
                style={styles.reportCard}
                onPress={navigateToHospitalCheck}>
                <Text style={styles.cardOption}>Laporan Hasil Checkup</Text>
                <Image
                  source={require('../assets/egk-report.png')}
                  style={{ resizeMode: 'contain', width: 80, height: 80 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.reportCardSection}>
              {/* {patientData.HospitalRecords.map((el) => (
            <View style={styles.reportCard} key={el.id}>
              <Text>{el.type_test}</Text>
              <Image style={styles.stretch} source={{ uri: el.file }} />
              <Text>Tanggal: {el.date}</Text>
              <TouchableOpacity
                style={styles.detailBtn}
                onPress={() => btnDetailPress(el.file)}>
                <Text style={{ color: '#fff', alignSelf: 'center' }}>
                  Detail
                </Text>
              </TouchableOpacity>
            </View>
          ))} */}
              <TouchableOpacity style={styles.reportCard} onPress={navigateToMaps}>
                <Text style={styles.cardOption}>Rumah Sakit Terdekat</Text>
                <Image
                  source={require('../assets/healthcare.png')}
                  style={{ resizeMode: 'contain', width: 80, height: 80 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.reportCardSection}>
              <TouchableOpacity style={styles.reportCard} onPress={navigateToHealthyLife}>
                <Text style={styles.cardOption}>Healty Life</Text>
                <Image
                  source={require('../assets/healthylife.png')}
                  style={{ resizeMode: 'contain', width: 80, height: 80 }}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bgCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    minHeight: '100%',
    paddingBottom: '50%'
  },
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingTop: 20,
    minHeight: '100%'
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    alignSelf: 'flex-start'
  },
  profileSection: {
    flex: 1,
    backgroundColor: '#fff',
    width: 350,
    padding: 10,
    marginLeft: 20,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 28,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20
  },
  cardOption: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#fff'
  },
  reportCardSection: {
    alignSelf: 'center',
    marginBottom: '5%'
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    backgroundColor: '#27ae60',
    width: 350,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#99AAAB',
    paddingHorizontal: 10
  },
  stretch: {
    marginVertical: 15,
    width: 250,
    height: 200,
    alignSelf: 'center'
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
