import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function AppForm() {
  const navigation = useNavigation();

  const retornarList = () => {
    navigation.navigate('AppList');
  }

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

  async function botaoPressed() {
    const item = { id: new Date().getTime(), fNome, sNome, empresa, telefone, email, dataNasc, end, apelido, notas };
    let items = [];
    const response = await AsyncStorage.getItem('items');

    if (response) items = JSON.parse(response);

    items.push(item);

    console.log(items);

    await AsyncStorage.setItem('items', JSON.stringify(items));


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
      <View style={styles.inputContainer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    alignSelf: 'center'
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#000',
    alignSelf: 'center'
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