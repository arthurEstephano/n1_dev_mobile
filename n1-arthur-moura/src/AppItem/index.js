import React, { useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function AppItem(props) {
    const navigation = useNavigation();

    const viewProfile = () => {
        navigation.navigate('AppProfile', props);
      }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=> viewProfile()}>
            <Text style={ styles.textItem}>{props.item}</Text>
            </TouchableOpacity>
            <View style={ styles.buttonsContainer}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10
    }, 
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#CCC',
        alignItems: 'center'
    }, 
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#CCC',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold'
    }, 
    textItem: {
        fontSize: 20,
        color: '#fff'
    }
})