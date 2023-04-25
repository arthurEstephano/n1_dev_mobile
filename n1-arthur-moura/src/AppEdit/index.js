import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Avatar } from "@react-native-material/core";
import * as ImagePicker from 'expo-image-picker';

export default function AppEdit({ route }) {
    const navigation = useNavigation();

    const retornarPerfil = () => {
        navigation.navigate('AppProfile', route.params);
    }

    const retornarList = () => {
        navigation.navigate('AppList');
    }

    const [image, setImage] = useState(route.params.image)
    const [id, setId] = useState(route.params.id);
    const [fNome, setFNome] = useState(route.params.fNome);
    const [sNome, setsNome] = useState(route.params.sNome);
    const [empresa, setEmpresa] = useState(route.params.empresa);
    const [telefone, setTelefone] = useState(route.params.telefone);
    const [email, setEmail] = useState(route.params.email);
    const [dataNasc, setDataNasc] = useState(route.params.dataNasc);
    const [end, setEnd] = useState(route.params.end);
    const [apelido, setApelido] = useState(route.params.apelido);
    const [notas, setNotas] = useState(route.params.notas);

    function fNomeChanged(fNome) {
        setFNome(fNome);
    }

    function sNomeChanged(sNome) {
        setsNome(sNome);
    }

    function empresaChanged(empresa) {
        setEmpresa(empresa);
    }

    function telefoneChanged(telefone) {
        setTelefone(telefone);
    }

    function emailChanged(email) {
        setEmail(email);
    }

    function dataNascChanged(dataNasc) {
        setDataNasc(dataNasc);
    }

    function endChanged(end) {
        setEnd(end);
    }

    function apelidoChanged(apelido) {
        setApelido(apelido);
    }

    function notasChanged(notas) {
        setNotas(notas);
    }

    const nomeTitulo = () => {
        if(apelido != '' || apelido != undefined){
            return (apelido);
        }
        else{
            return (fNome + ' ' + sNome);
        }
    }

    const imageChange = async () => {
        // Pede permissão pro usuário para acessar as fotos
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Você recusou a abrir suas fotos!");
            return;
        }

        const response = await ImagePicker.launchImageLibraryAsync({ base64: true, allowsEditing: true, quality: 0.5 });

        // Printando resultado
        console.log(response);

        if (!response.canceled) {
            setImage(response.assets[0].uri);
            console.log(response.assets[0].uri);
        }
    }

    useEffect(() => { }, [])


    async function botaoPressed() {
        const item = { id, fNome, sNome, empresa, telefone, email, dataNasc, end, apelido, notas };
        let items = [];
        const response = await AsyncStorage.getItem('items');

        if (response) items = JSON.parse(response);

        for (let i = 0; i < items.length; i++) {
            if (items[i] == undefined) {
                items.splice(i, 1);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].id == route.params.id) {
                items[i] = item;
                break;
            }
        }

        console.log(items);

        await AsyncStorage.setItem('items', JSON.stringify(items));

        retornarPerfil();
    }

    async function deletar() {
        const item = { id, fNome, sNome, empresa, telefone, email, dataNasc, end, apelido, notas };
        let items = [];
        const response = await AsyncStorage.getItem('items');

        if (response) items = JSON.parse(response);

        for (let i = 0; i < items.length; i++) {
            if (items[i].id == route.params.id) {
                items.splice(i, 1);
                break;
            }
        }

        console.log(items);

        await AsyncStorage.setItem('items', JSON.stringify(items));

        retornarList();
    }

    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <TouchableOpacity
                    onPress={() => retornarPerfil()}
                >
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => botaoPressed()}
                >
                    <Text style={styles.buttonText}>Feito</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{fNome + ' ' + sNome + ' ' + empresa}</Text>
            <View style={styles.imageAvatar}>
                <TouchableOpacity onPress={() => imageChange()}>
                    <Avatar
                        size={72}
                        image={{ uri: image }}
                        label={fNome}
                        icon={props => <Icon name="account" {...props} />}>
                    </Avatar>
                </TouchableOpacity>
            </View>
            <ScrollView  automaticallyAdjustKeyboardInsets={true} style={styles.scrollContainer} contentContainerStyle={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    clearButtomMode="always"
                    value={fNome}
                    onChangeText={fNomeChanged}
                    placeholder="Primeiro Nome"
                />
                <TextInput
                    editable={true}
                    style={styles.input}
                    clearButtomMode="always"
                    value={sNome}
                    onChangeText={sNomeChanged}
                    placeholder="Segundo Nome"
                />
                <TextInput
                    editable={true}
                    style={styles.input}
                    clearButtomMode="always"
                    value={empresa}
                    placeholder="Empresa"
                    onChangeText={empresaChanged}
                />
                <TextInput
                    editable={true}
                    style={styles.input}
                    clearButtomMode="always"
                    value={telefone}
                    placeholder="Telefone"
                    onChangeText={telefoneChanged}
                />
                <TextInput
                    editable={true}
                    style={styles.input}
                    clearButtomMode="always"
                    value={email}
                    placeholder="E-mail"
                    onChangeText={emailChanged}
                />
                <TextInput
                    editable={true}
                    style={styles.input}
                    clearButtomMode="always"
                    value={dataNasc}
                    placeholder="Data de Nascimento"
                    onChangeText={dataNascChanged}
                />
                <TextInput
                    editable={true}
                    style={styles.input}
                    clearButtomMode="always"
                    value={end}
                    placeholder="Endereço"
                    onChangeText={endChanged}
                />
                <TextInput
                    editable={true}
                    style={styles.input}
                    clearButtomMode="always"
                    value={apelido}
                    placeholder="Apelido"
                    onChangeText={apelidoChanged}
                />
                <TextInput
                    editable={true}
                    style={styles.input}
                    clearButtomMode="always"
                    value={notas}
                    placeholder="Notas"
                    onChangeText={notasChanged}
                />
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        onPress={() => deletar()}
                    >
                        <Text style={styles.deleteButton}>Deletar</Text>
                    </TouchableOpacity>
                </View>
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
        width: '100%'
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
    deleteButton: {
        alignSelf: 'flex-end',
        color: "#9F0909",
        fontWeight: 'bold',
        fontSize: 15
    },
    buttonText: {
        marginHorizontal: 135,
        color: "#14099F",
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 15
    }
});