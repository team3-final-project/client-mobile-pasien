import React from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'

function Home({ route }) {
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
    width: 200
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
    alignSelf: 'center'
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
