import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Avatar } from "@react-native-material/core";

export default function AppProfile({ route }) {
    const navigation = useNavigation();

    const retornarList = () => {
        navigation.navigate('AppList');
    }

    const editarContato = () => {
        navigation.navigate('AppEdit', route.params);
      }

    const [image,setImage]=useState(null)
    const [fNome, setFNome] = useState('');
    const [sNome, setsNome] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [end, setEnd] = useState('');
    const [apelido, setApelido] = useState('');
    const [notas, setNotas] = useState('');

    useEffect(() => {
        let obj = route.params
        if (obj) {
            setFNome(obj.fNome)
            setsNome(obj.sNome)
            setEmpresa(obj.empresa)
            setTelefone(obj.telefone)
            setEmail(obj.email)
            setDataNasc(obj.dataNasc)
            setEnd(obj.end)
            setApelido(obj.apelido)
            setNotas(obj.notas)
            setImage(obj.image)
        }
    })

    const nomeTitulo = () => {
        if(apelido != '' || apelido != undefined){
            return (apelido);
        }
        else{
            if(sNome != '' || sNome != undefined){
                return (fNome + ' ' + sNome);
            }
            else{
                return (fNome);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <TouchableOpacity
                    onPress={() => retornarList()}
                >
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => editarContato()}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{nomeTitulo() + ' ' + empresa}</Text>
            <Avatar
                style={styles.imageAvatar}
                size={72}
                image={{ uri: image }}
                label={fNome}
                icon={props => <Icon name="account" {...props} />}>
            </Avatar>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.inputContainer}>
                <TextInput
                    editable={false}
                    style={styles.input}
                    clearButtomMode="always"
                    placeholder="Telefone"
                    value={telefone}
                />
                <TextInput
                    editable={false}
                    style={styles.input}
                    clearButtomMode="always"
                    placeholder="E-mail"
                    value={email}
                />
                <TextInput
                    editable={false}
                    style={styles.input}
                    clearButtomMode="always"
                    placeholder="Data de Nascimento"
                    value={dataNasc}
                />
                <TextInput
                    editable={false}
                    style={styles.input}
                    clearButtomMode="always"
                    placeholder="Endereço"
                    value={end}
                />
                <TextInput
                    editable={false}
                    style={styles.input}
                    clearButtomMode="always"
                    placeholder="Apelido"
                    value={apelido}
                />
                <TextInput
                    editable={false}
                    style={styles.input}
                    clearButtomMode="always"
                    placeholder="Notas"
                    value={notas}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    imageAvatar:{
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
      },
    line: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50
    },
    title: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: "center"
    },
    scrollContainer: {
        flex: 1,
        width: '90%'
      },
    inputContainer: {
        flex: 1,
        marginTop: 5,
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#000'
    },
    input: {
        marginTop: 5,
        height: 60,
        backgroundColor: '#141414',
        color: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
    },
    buttonText: {
        marginHorizontal: 135,
        color: "#14099F",
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 15
    }
});