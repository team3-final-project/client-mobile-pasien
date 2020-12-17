import React from 'react';
import { StyleSheet, ActivityIndicator, View, Image, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import firebase from '../firebase';

const initialState = {
  latitude : null,
  longitude : null,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export default function Maps() {
  const [ currentLocation, setCurrentLocation ] = React.useState(initialState);
  const [ hospitalLocation, setHospitalLocation ] = React.useState(null);
  const [ marker, setMarker ] = React.useState({});
  const [ img, setImg ] = React.useState('')

  const fetch_GPlaces = (latitude, longitude) => {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}, ${longitude}&radius=5000&type=hospital&key=AIzaSyDXOWm9hN4HpuMEVwGHkgdYHyomG0LkZ9k`)
      .then(response => {
        if(response.ok){
          return response.json();
        } else {
          return Promise.reject('Google places Error!!')
        }
      })
      .then(({ results }) => {
        setHospitalLocation(results);
      })
      .catch(err => console.log(err))
  }

  const fetch_GPlacesPict = (pictId) => {
    console.log(pictId, '<<<< id reference');
    setImg(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${pictId}&key=AIzaSyDXOWm9hN4HpuMEVwGHkgdYHyomG0LkZ9k`)
  }

  const fetch_GPlacesDetail = (place_id) => {
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,formatted_address,formatted_phone_number&key=AIzaSyDXOWm9hN4HpuMEVwGHkgdYHyomG0LkZ9k`)
      .then(response=>{
        if(response.ok){
          return response.json()
        } else {
          return Promise.reject('Get Google Places Detail Failed!')
        }
      })
      .then(({ result })=>{
        console.log(result, '<<<< detail ');
        setMarker(result);
      })
      .catch(err=>console.log(err))
  }

  let detailView = () => {
    return (
      <View
          style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              padding: 5, 
              flexDirection: 'row',
              backgroundColor: '#dcdde1'
          }}
        >
          <Image 
            source={{ uri: img }}
            resizeMode="cover"
            style={{ width: 100 }}
          />
          <View 
            style={{ flex:1, paddingLeft:5, flexDirection: 'column'}}
          >
            <Text style={{ fontWeight: 'bold' }}>{marker.name}</Text>
            <Text>Alamat: {marker.formatted_address}</Text>
            <Text>No Telp: {marker.formatted_phone_number}</Text>
          </View>
        </View>
    )
  }

  React.useEffect(()=>{
    console.log('masuk use Effect maps');
    async function getPermissions(){
      try {
        const { status } = await Permissions.getAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          const response = await Permissions.askAsync(Permissions.LOCATION);
        }
        navigator.geolocation.getCurrentPosition(position => {
          const { longitude, latitude } = position.coords;
          setCurrentLocation({
            ...currentLocation,
            latitude, 
            longitude
          })
        },
          error => alert(error.message),
          { timeout: 20000, maximumAge: 1000 }
        )
      } catch (err) {
        alert(err.message);
      }
    }
    getPermissions();
  }, [])

  React.useEffect(()=>{
    fetch_GPlaces(currentLocation.latitude, currentLocation.longitude);
  },[currentLocation])

  const handleDetail = (params) => {
    fetch_GPlacesDetail(params.place_id);
    fetch_GPlacesPict(params.photos[0].photo_reference);
  }

  // console.log(hospitalLocation, '<<<< hospital location');
  // console.log(marker, '<<<< isi marker');

  return currentLocation.latitude ? (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        showsUserLocation
        showsBuildings
        initialRegion={currentLocation}
        onPress={()=> setMarker({})}
      >
        {hospitalLocation.map((el, i) => (
          <Marker
            key={i}
            coordinate={{
            latitude: el.geometry.location.lat,
            longitude: el.geometry.location.lng
            }}
            title={el.name}
            // description={'address : ' + el.vicinity} 
            onPress={() => handleDetail(el)}
          />
        ))}
      </MapView>
        {/* add detail */}
        { marker.hasOwnProperty('name') && detailView() }
        
    </>
  ) : <ActivityIndicator style={{ flex: 1 }} animating size="large" />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
