import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker';


function HealthyLife() {
    const [selectedValue, setSelectedValue] = useState("Exercise Fact")
    return (
        <View style={styles.container}>
            <View
                style={{ alignSelf: 'center', paddingTop: '10%', marginBottom: 10 }}>
                <Text color={'#fff'} style={styles.h1}>
                    Healthy Life
        </Text>
            </View>
            <Image
                style={{ alignSelf: 'center', marginBottom: 10 }}
                source={require('../assets/scientist.png')}
            />
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}
            >
                <View
                >
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100, marginLeft: 10 }}
                />
                </View>
                <View>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 40, width: 150 }}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Exercise Fact" />
                    <Picker.Item label="Nutrition Fact" />
                </Picker>
                </View>
            </View>
            <View>
                <Button
                    title="click"
                    color="#841584"
                    style={{ height: 40, width: 70 }}
                />
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

export default HealthyLife