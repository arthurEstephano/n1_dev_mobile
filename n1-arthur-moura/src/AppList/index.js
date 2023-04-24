import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppItem from '../AppItem';

export default function AppList() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  const addContato = () => {
    navigation.navigate('AppForm');
  }


  async function getItems() {
    return AsyncStorage.getItem('items')
      .then(response => {
        if (response)
          return Promise.resolve(JSON.parse(response));
        else
          return Promise.resolve([]);
      })
  }

  useEffect(() => {
    getItems().then(items => setItems(items));
  }, [items]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.line}>
        <Text style={styles.title}>Contatos</Text>
        <TouchableOpacity onPress={()=>addContato()}>
          <Text style={styles.buttonAdd}>+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.itemsContainer}>
        {items.map(item => {
          return <AppItem key={item.id} id={item.id} fNome={item.fNome} sNome={item.sNome} empresa={item.empresa} telefone={item.telefone} email={item.email} dataNasc={item.dataNasc} end={item.end} apelido={item.apelido} notas={item.notas} item={item.fNome +' ' + item.sNome + ' ' + item.empresa} />
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: 'flex-start',
    marginTop: 50,
    marginBottom: 5
  },
  buttonAdd: {
    color: "#14099F",
    alignItems: "flex-end",
    justifyContent: "center",
    alignContent: 'flex-end',
    fontSize: 35,
    marginTop: 50,
    marginBottom: 5,
    marginLeft: 200
  },
  scrollContainer: {
    flex: 1,
    width: '90%'
  },
  itemsContainer: {
    flex: 1,
    marginTop: 5,
    padding: 20,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderColor: "#666666",
    alignItems: 'stretch',
    backgroundColor: '#000'
  }
});