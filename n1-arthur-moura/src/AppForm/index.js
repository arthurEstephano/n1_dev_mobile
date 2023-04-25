import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';
import { CheckBox } from "@rneui/themed";


export default function AppForm() {
  const navigation = useNavigation();

  const retornarList = () => {
    navigation.navigate('AppList');
  }

  const [me, setMe] = useState(false);
  const [image, setImage] = useState(null)
  const [fNome, setFNome] = useState('');
  const [sNome, setsNome] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [end, setEnd] = useState('');
  const [apelido, setApelido] = useState('');
  const [notas, setNotas] = useState('');

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

  async function botaoPressed() {
    const item = { id: new Date().getTime(), fNome, sNome, empresa, telefone, email, dataNasc, end, apelido, notas, image, me };
    let items = [];
    const response = await AsyncStorage.getItem('items');

    if (response) items = JSON.parse(response);

    if (me == true) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].me == true) {
          alert("Você já tem um contato seu!");
          return;
        }
      }

    }

    items.push(item);

    console.log(items);

    await AsyncStorage.setItem('items', JSON.stringify(items));

    retornarList();
  }

  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <TouchableOpacity
          onPress={() => retornarList()}
        >
          <Text style={styles.buttonTextCancelar}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => botaoPressed()}
        >
          <Text style={styles.buttonTextAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Novo Contato</Text>
      <View style={styles.imageAvatar}>
        <TouchableOpacity onPress={() => imageChange()}>
          <Avatar
            size={72}
            image={{ uri: image }}
            icon={props => <Icon name="account" {...props} />}>
          </Avatar>
        </TouchableOpacity>
      </View>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={styles.scrollContainer}
        contentContainerStyle={styles.inputContainer}>
        <TextInput
          marginTop="5"
          style={styles.input}
          placeholder="Primeiro Nome"
          clearButtomMode="always"
          onChangeText={fNomeChanged}
        />
        <TextInput
          style={styles.input}
          placeholder="Segundo Nome"
          clearButtomMode="always"
          onChangeText={sNomeChanged}
        />
        <TextInput
          style={styles.input}
          placeholder="Empresa"
          clearButtomMode="always"
          onChangeText={empresaChanged}
        />
        <TextInput
          marginTop="15"
          style={styles.input}
          placeholder="Telefone"
          clearButtomMode="always"
          onChangeText={telefoneChanged}
        />
        <TextInput
          marginTop="15"
          style={styles.input}
          placeholder="E-mail"
          clearButtomMode="always"
          onChangeText={emailChanged}
        />
        <TextInput
          marginTop="30"
          style={styles.input}
          placeholder="Data de Nascimento"
          clearButtomMode="always"
          onChangeText={dataNascChanged}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          clearButtomMode="always"
          onChangeText={endChanged}
        />
        <TextInput
          style={styles.input}
          placeholder="Apelido"
          clearButtomMode="always"
          onChangeText={apelidoChanged}
        />
        <TextInput
          marginTop="30"
          style={styles.input}
          placeholder="Notas"
          clearButtomMode="always"
          onChangeText={notasChanged}
        />
        <CheckBox
          containerStyle={styles.check}
          checkedTitle="Sou eu!"
          uncheckedColor="red"
          checkedColor="blue"
          title="Eu"
          checked={me}
          onPress={() => setMe(!me)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  check: {
    flex: 1,
    backgroundColor: '#000'
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    alignContent: 'stretch'
  },
  imageAvatar: {
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    alignSelf: 'center'
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
  buttonTextCancelar: {
    color: "#14099F",
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 15
  },
  buttonTextAdicionar: {
    color: "#14099F",
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 15
  },
});