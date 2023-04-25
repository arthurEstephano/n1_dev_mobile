import React, { useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Avatar } from "@react-native-material/core";

export default function AppItem(props) {
    const navigation = useNavigation();

    const viewProfile = () => {
        navigation.navigate('AppProfile', props);
    }

    const checkMe = () => {
        if(props.me == true){
            return ('Eu')
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.line} onPress={() => viewProfile()}>
                <Avatar
                    style={styles.imageAvatar}
                    size={32}
                    image={{ uri: props.image }}
                    label={props.fNome}
                    icon={props => <Icon name="account" {...props} />}>
                </Avatar>
                <Text style={styles.textItem}>{props.item}</Text>
                <Text style={styles.textMe}>{checkMe()}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
        width: '100%'
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    imageAvatar: {
        alignSelf: 'center'
    },
    textMe: {
        fontSize: 25,
        color: '#14099F',
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    textItem: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center'
    }
})