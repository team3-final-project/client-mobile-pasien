import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker'
import { Card } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { readNutrition, readExercise } from '../store/index'

function HealthyLife() {
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()

  const dataNutritions = useSelector((state) => state.nutritions)
  const dataExercises = useSelector((state) => state.exercises)

  const exercise = () => {
    return (
      <View style={styles.thirdflex}>
        {dataExercises.map((e) => (
          <View key={e.tag_id}>
            <Card style={{ backgroundColor: 'white' }}>
              <Card.Title>Estimated Calories Burn</Card.Title>
              <Text>{e.nf_calories} kcal</Text>
            </Card>
          </View>
        ))}
      </View>
    )
  }

  const nutrition = () => {
    return (
      <View>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 20,
            fontWeight: '700'
          }}>
          Result
        </Text>
        <View style={styles.thirdflex}>
          <Card containerStyle={{ padding: 10 }}>
            {dataNutritions.map((e, index) => (
              <View key={index}>
                <View
                  style={{ borderBottomWidth: 3, borderBottomColor: 'black' }}>
                  <Card.Title style={{ padding: 0, margin: 0, fontSize: 30 }}>
                    Nutrition Facts
                  </Card.Title>
                </View>
                <View
                  style={{
                    height: 20,
                    padding: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black'
                  }}>
                  <Text>Amount Per Serving</Text>
                </View>
                <View
                  style={{
                    height: 27,
                    padding: 1,
                    borderBottomWidth: 7,
                    borderBottomColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text>Calories</Text>
                  <Text>{e.nf_calories}</Text>
                </View>
                <View
                  style={{
                    height: 20,
                    padding: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                  }}>
                  <Text></Text>
                  <Text>% Daily Value</Text>
                </View>
                <View
                  style={{
                    height: 20,
                    padding: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text>Total Fat</Text>
                  <Text>{e.nf_total_fat} %</Text>
                </View>
                <View
                  style={{
                    height: 20,
                    padding: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text>Cholesterol</Text>
                  <Text>{e.nf_cholesterol} %</Text>
                </View>
                <View
                  style={{
                    height: 20,
                    padding: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text>Sodium</Text>
                  <Text>{e.nf_sodium} %</Text>
                </View>
                <View
                  style={{
                    height: 20,
                    padding: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text>Potassium</Text>
                  <Text>{e.nf_potassium} %</Text>
                </View>
                <View
                  style={{
                    height: 20,
                    padding: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text>Total Carbohydrates</Text>
                  <Text>{e.nf_total_carbohydrate} %</Text>
                </View>
                <View
                  style={{
                    height: 28,
                    padding: 1,
                    borderBottomWidth: 10,
                    borderBottomColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text>Protein</Text>
                  <Text>{e.nf_protein} %</Text>
                </View>
                {e.full_nutrients.map((el) => {
                  if (el.attr_id === 318) {
                    return (
                      <View
                        style={{
                          height: 20,
                          padding: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: 'black',
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}>
                        <Text>Vitamin A</Text>
                        <Text>{el.value} %</Text>
                      </View>
                    )
                  } else if (el.attr_id === 401) {
                    return (
                      <View
                        style={{
                          height: 20,
                          padding: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: 'black',
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}>
                        <Text>Vitamin C</Text>
                        <Text>{el.value} %</Text>
                      </View>
                    )
                  } else if (el.attr_id === 301) {
                    return (
                      <View
                        style={{
                          height: 20,
                          padding: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: 'black',
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}>
                        <Text>Calcium</Text>
                        <Text>{el.value} %</Text>
                      </View>
                    )
                  } else if (el.attr_id === 303) {
                    return (
                      <View
                        style={{
                          height: 20,
                          padding: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: 'black',
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}>
                        <Text>Iron</Text>
                        <Text>{el.value} %</Text>
                      </View>
                    )
                  }
                })}
              </View>
            ))}
          </Card>
        </View>
      </View>
    )
  }

  const handlingInput = (text) => {
    setQuery(text)
  }

  const handleForm = () => {
    if (category === 'nutrition') {
      dispatch(readNutrition(query))
    } else if (category === 'exercise') {
      dispatch(readExercise(query))
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.firstflex}>
        <View
          style={{ alignSelf: 'center', paddingTop: '10%', marginBottom: 10 }}>
          <Text color={'#fff'} style={styles.h1}>
            Check Nutrition
          </Text>
        </View>
        <Image
          style={{ alignSelf: 'center', marginBottom: 10 }}
          source={require('../assets/scientist-6.png')}
        />
      </View>
      <View style={styles.secondflex}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column'
          }}>
          <View style={{ flex: 1, alignSelf: 'center' }}>
            <TextInput
              style={{
                height: 50,
                backgroundColor: '#fff',
                paddingLeft: 7,
                width: 320,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                color: '#000000'
              }}
              onChangeText={(text) => handlingInput(text)}
              placeholder="Write something here"
            />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center' }}>
            <DropDownPicker
              items={[
                { label: 'Nutrition Facts', value: 'nutrition' },
                { label: 'Exercise Facts', value: 'exercise' }
              ]}
              defaultIndex={0}
              placeholder="Category"
              containerStyle={{
                height: 40,
                width: 150,
                marginTop: 10,
                marginBottom: 80,
                alignSelf: 'center'
              }}
              onChangeItem={(item) => setCategory(item.value)}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              height: 40,
              width: 150,
              marginTop: 10,
              marginBottom: 80
            }}>
            <TouchableOpacity onPress={() => handleForm()}>
              <View
                style={{
                  backgroundColor: '#27ae60',
                  width: 150,
                  height: 40,
                  borderRadius: 5,
                  alignContent: 'center',
                  justifyContent: 'center'
                }}>
                <Text style={{ textAlign: 'center', color: '#fff' }}>
                  Calculate
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        {category === 'nutrition' && nutrition()}
        {category === 'exercise' && exercise()}
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
  firstflex: {
    flex: 3,
    flexDirection: 'column'
  },
  secondflex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 5
  },
  thirdflex: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 50
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
  btn: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'stretch'
  }
})

export default HealthyLife
