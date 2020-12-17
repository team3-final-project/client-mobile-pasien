import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker';
import { Card } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import { readNutrition, readExercise } from '../store/index'

function HealthyLife() {

    const [category, setCategory] = useState("")
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()

    const dataNutritions = useSelector((state) => state.nutritions)
    const dataExercises = useSelector((state) => state.exercises)

    let totalBurned = 0

    dataExercises.map(el => {
        totalBurned += el.nf_calories
    })

    const exercise = () => {
        return (
            <View style={styles.thirdflex}>
                <View style={{alignContent: 'center'}}>
                    <Card style={{backgroundColor: 'white', borderRadius: 20}}>
                        <Card.Title>Estimated Calories Burned :</Card.Title>
                        <Text style={{alignSelf: 'center'}}>{totalBurned} kcal</Text>
                    </Card>
                </View>
            </View>
        )
    }

    let calories = 0;
    let totalfat = 0;
    let cholesterol = 0;
    let sodium = 0;
    let potassium = 0;
    let carbohydrate = 0;
    let protein = 0;
    let vitA = 0;
    let vitC = 0;
    let calcium = 0;
    let iron = 0;
    let muncul = false

    useEffect(() => {
        calories = 0;
        totalfat = 0;
        cholesterol = 0;
        sodium = 0;
        potassium = 0;
        carbohydrate = 0;
        protein = 0;
        vitA = 0;
        vitC = 0;
        calcium = 0;
        iron = 0;
        muncul = false
    }, [])

    dataNutritions.map(el => {
        calories += el.nf_calories
        totalfat += el.nf_total_fat
        cholesterol += el.nf_cholesterol
        sodium += el.nf_sodium
        potassium += el.nf_potassium
        carbohydrate += el.nf_total_carbohydrate
        protein += el.nf_protein

        el.full_nutrients.map(ele => {
            if(ele.attr_id === 318) {
                vitA += ele.value
            }
            if(ele.attr_id === 401) {
                vitC += ele.value
            }
            if(ele.attr_id === 301) {
                calcium += ele.value
            }
            if(el.attr_id === 303) {
                iron += ele.value
            }
        })
    })



    const nutrition = () => {
        return (
            <View style={styles.thirdflex}>
                <Text style={{textAlign: 'center', color: 'white', marginBottom: 200}}>Scroll down to check out the result below!</Text>
                <Card containerStyle={{ padding: 10, marginBottom: 130}}>
                        <View>
                            <View style={{ borderBottomWidth: 3, borderBottomColor: 'black' }}>
                                <Card.Title style={{ padding: 0, margin: 0, fontSize: 30 }} >Nutrition Facts</Card.Title>
                            </View>
                            <View style={{ height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                                <Text>Amount Per Serving</Text>
                            </View>
                            <View style={{ height: 27, padding: 1, borderBottomWidth: 7, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Calories</Text>
                                <Text>{calories}</Text>
                            </View>
                            <View style={{ height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text></Text>
                                <Text>% Daily Value</Text>
                            </View>
                            <View style={{ height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Total Fat</Text>
                                <Text>{totalfat} %</Text>
                            </View>
                            <View style={{ height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Cholesterol</Text>
                                <Text>{cholesterol} %</Text>
                            </View>
                            <View style={{ height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Sodium</Text>
                                <Text>{sodium} %</Text>
                            </View>
                            <View style={{ height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Potassium</Text>
                                <Text>{potassium} %</Text>
                            </View>
                            <View style={{ height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Total Carbohydrates</Text>
                                <Text>{carbohydrate} %</Text>
                            </View>
                            <View style={{ height: 28, padding: 1, borderBottomWidth: 10, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Protein</Text>
                                <Text>{protein} %</Text>
                            </View>
                            <View style={{ height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Vitamin A</Text>
                                <Text>{vitA} %</Text>
                            </View>
                            <View style={{ height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Vitamin C</Text>
                                <Text>{vitC} %</Text>
                            </View>
                            <View style={{ height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Calcium</Text>
                                <Text>{calcium} %</Text>
                            </View>
                            <View style={{ height: 20, padding: 1, borderBottomWidth: 1, borderBottomColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Iron</Text>
                                <Text>{iron} %</Text>
                            </View>
                        </View>
                </Card>
            </View>
        )
    }

    const handlingInput = (text) => {
        setQuery(text)
    }

    const handleForm = () => {
        if (category === 'nutrition') {
            dispatch(readNutrition(query))
        }
        else if (category === 'exercise') {
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
                    <View style={{ flex: 1, alignSelf: 'center' }}>
                        <TextInput
                            style={{ height: 50, paddingLeft: 7, width: 320, borderColor: 'gray', borderWidth: 1, borderRadius: 5, color: 'white' }}
                            onChangeText={(text) => handlingInput(text)}
                            placeholder="What did you do or eat today?"
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center' }}>
                        <DropDownPicker
                            items={[
                                { label: 'Nutrition Facts', value: 'nutrition' },
                                { label: 'Exercise Facts', value: 'exercise' },
                            ]}
                            defaultIndex={0}
                            placeholder="Category"
                            containerStyle={{ height: 40, width: 150, marginTop: 10, marginBottom: 80, alignSelf: 'center' }}
                            onChangeItem={item => setCategory(item.value)}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', height: 40, width: 150, marginTop: 10, marginBottom: 80 }}>
                        <TouchableOpacity onPress={() => handleForm()}>
                            <View style={{ backgroundColor: 'aqua', width: 150, height: 40, borderRadius: 5 }}>
                                <Text style={{ alignSelf: 'center', marginTop: 12 }}>Calculate</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {category === 'nutrition' && calories > 0 && nutrition()}
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