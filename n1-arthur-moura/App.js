import { StatusBar } from 'expo-status-bar';
import AppList from './src/AppList';
import AppForm from './src/AppForm';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppProfile from './src/AppProfile';

import AppEdit from './src/AppEdit';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="AppList"
          component={AppList}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen 
        name="AppForm" 
        component={AppForm} />
        <Stack.Screen 
        name="AppProfile" 
        component={AppProfile} />
      <Stack.Screen 
        name="AppEdit" 
        component={AppEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
