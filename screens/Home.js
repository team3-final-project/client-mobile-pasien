import React, { useState, useEffect, useRef } from 'react'
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
  SafeAreaView,
  Platform,
  Button
} from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

function Home({ route }) {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

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
      console.log(token)
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

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Reminder',
      body: 'Waktu nya untuk minum obat',
      data: { data: 'goes here' }
    }

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification)
      }
    )

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response)
      }
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }, [])

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
            <Text style={styles.name}>M. Dicky Andeyan Naratama</Text>
            <Text style={styles.birthplace}>Cianjur, 24 Desember 1995</Text>
            <Text style={styles.address}>
              Komplek GBA-2 Blok J5 no 32, Kab. Bandung
            </Text>
          </View>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken)
          }}
        />
        <Text style={styles.medicalHeader}>Laporan Medis Anda</Text>
        {/* CARD FOR TEST SCROLL ONLY */}
        <View style={styles.reportCardSection}>
          <View style={styles.reportCard}>
            <Text>Diagnosa:</Text>
            <Text>Obat: </Text>
            <Text>Dokter: </Text>
            <TouchableOpacity style={styles.detailBtn}>
              <Text style={{ color: '#fff', alignSelf: 'center' }}>Detail</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reportCard}>
            <Text>Diagnosa:</Text>
            <Text>Obat: </Text>
            <Text>Dokter: </Text>
            <TouchableOpacity style={styles.detailBtn}>
              <Text style={{ color: '#fff', alignSelf: 'center' }}>Detail</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reportCard}>
            <Text>Diagnosa:</Text>
            <Text>Obat: </Text>
            <Text>Dokter: </Text>
            <TouchableOpacity style={styles.detailBtn}>
              <Text style={{ color: '#fff', alignSelf: 'center' }}>Detail</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reportCard}>
            <Text>Diagnosa:</Text>
            <Text>Obat: </Text>
            <Text>Dokter: </Text>
            <TouchableOpacity style={styles.detailBtn}>
              <Text style={{ color: '#fff', alignSelf: 'center' }}>Detail</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reportCard}>
            <Text>Diagnosa:</Text>
            <Text>Obat: </Text>
            <Text>Dokter: </Text>
            <TouchableOpacity style={styles.detailBtn}>
              <Text style={{ color: '#fff', alignSelf: 'center' }}>Detail</Text>
            </TouchableOpacity>
          </View>
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
