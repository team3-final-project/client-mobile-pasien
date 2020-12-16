import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker';
import { Card } from 'react-native-elements'
import { color } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { readNutrition, readExercise } from '../store/index'


function HealthyLife() {

    const [ category, setCategory ] = useState("")
    const [ query, setQuery ] = useState("")

    const dispatch = useDispatch()

    const dataNutritions = useSelector((state) => state.nutritions)
    const dataExercises = useSelector((state) => state.exercises)

    const exercise = () => {
        return (
            <View style={styles.thirdflex}>
                <View>
                    <Card style={{backgroundColor: 'white'}}>
                        <Card.Title>Estimated Calories Burn</Card.Title>
                        <Text>658 kcal</Text>
                    </Card>
                </View>
            </View>
        )
    }

    let calories = 0;
    let total_fat = 0;
    let cholesterol = 0;
    let sodium = 0;
    let potassium = 0;
    let carbohydrate = 0;
    let protein = 0;
    let vitA = 0;
    let vitC = 0;
    let calcium = 0;
    let iron = 0;

    dataNutritions.map(el => {
        calories += el.nf_calories
        total_fat += el.nf_total_fat
        cholesterol += el.nf_cholesterol
        sodium += el.nf_sodium
        potassium += el.nf_potassium
        carbohydrate += el.nf_total_carbohydrate
        protein += el.nf_protein
    })

    const nutrition = () => {
        return (
            <View style={styles.thirdflex}>
                <Text>{JSON.stringify(dataNutritions[1])}</Text>
                <Card containerStyle={{padding: 10}}>
                    <View style={{borderBottomWidth: 3, borderBottomColor: 'black'}}>
                        <Card.Title style={{padding: 0, margin: 0, fontSize: 30}} >Nutrition Facts</Card.Title>
                    </View>
                    <View style={{height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black'}}>
                        <Text>Amount Per Serving</Text>
                    </View>
                    <View style={{height: 27, padding: 1, borderBottomWidth: 7, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Calories</Text>
                        <Text>Calories from Fat</Text>
                    </View>
                    <View style={{height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text></Text>
                        <Text>% Daily Value</Text>
                    </View>
                    <View style={{height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Total Fat</Text>
                        <Text>persenan</Text>
                    </View>
                    <View style={{height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Cholesterol</Text>
                        <Text>persenan</Text>
                    </View>
                    <View style={{height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Sodium</Text>
                        <Text>persenan</Text>
                    </View>
                    <View style={{height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Potassium</Text>
                        <Text>persenan</Text>
                    </View>
                    <View style={{height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Total Carbohydrates</Text>
                        <Text>persenan</Text>
                    </View>
                    <View style={{height: 28, padding: 1, borderBottomWidth: 10, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Protein</Text>
                        <Text>persenan</Text>
                    </View>
                    <View style={{height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Vitamin A</Text>
                        <Text>persenan</Text>
                    </View>
                    <View style={{height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Vitamin C</Text>
                        <Text>persenan</Text>
                    </View>
                    <View style={{height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Calcium</Text>
                        <Text>persenan</Text>
                    </View>
                    <View style={{height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Iron</Text>
                        <Text>persenan</Text>
                    </View>
                </Card>
            </View>
        )
    }

    const handlingInput = (text) => {
        setQuery(text)
    }

    const handleForm = () => {
        if(category === 'nutrition') {
            dispatch(readNutrition(query))
        }
        else if(category === 'exercise') {
            dispatch(readExercise(query))
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.firstflex}>
                <View
                    style={{ alignSelf: 'center', paddingTop: '10%', marginBottom: 10 }}>
                    <Text color={'#fff'} style={styles.h1}>
                        Healthy Life
                    </Text>
                </View>
                <Image
                    style={{ alignSelf: 'center', marginBottom: 10 }}
                    source={require('../assets/patient.png')}
                />
            </View>
            <View style={styles.secondflex}>
                <View 
                    style={{
                        flex: 1,
                        flexDirection: 'column'
                    }}
                >
                    <View style={{flex: 1, alignSelf: 'center'}}>
                        <TextInput
                            style={{ height: 50, paddingLeft: 7, width: 320, borderColor: 'gray', borderWidth: 1, borderRadius: 5, color: 'white' }}
                            onChangeText={(text) => handlingInput(text)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center', alignSelf: 'center'}}>
                        <DropDownPicker
                            items={[
                                {label: 'Nutrition Facts', value: 'nutrition'},
                                {label: 'Exercise Facts', value: 'exercise'},
                            ]}
                            defaultIndex={0}
                            placeholder="Category"
                            containerStyle={{height: 40, width: 150, marginTop: 10, marginBottom: 80, alignSelf: 'center'}}
                            onChangeItem={item => setCategory(item.value)}
                        />
                    </View>
                    <View style={{flex: 1, alignItems: 'center', height: 40, width: 150, marginTop: 10, marginBottom: 80}}>
                        <TouchableOpacity onPress={handleForm}>
                            <View style={{backgroundColor: 'aqua', width: 150, height: 40, borderRadius: 5}}>
                                <Text style={{alignSelf: 'center', marginTop: 12}}>Calculate</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {category === 'nutrition' && nutrition()}
            {category === 'exercise' && exercise()}
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
        flex: 3,
        flexDirection: 'column'
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