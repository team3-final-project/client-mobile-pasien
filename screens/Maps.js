import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';

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

  React.useEffect(()=>{
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

  console.log(hospitalLocation, '<<<< hospital location');
  console.log(marker, '<<<< isi marker');

  return currentLocation.latitude ? (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        showsUserLocation
        showsBuildings
        initialRegion={currentLocation}
      >
        {hospitalLocation.map((el, i) => (
          // <MarkerScreen 
          //   key={i}
          //   data={el}
          //   currentLocation={currentLocation}
          // />
          <Marker
            key={i}
            coordinate={{
            latitude: el.geometry.location.lat,
            longitude: el.geometry.location.lng
            }}
            title={el.name}
            description={'address : ' + el.vicinity} 
            // onPress={handleDetail(el)}
          />
        ))}
      </MapView>
      // {/* <DetailHospitalScreen data={marker}/> */}
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
