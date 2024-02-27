import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import Camera from './screens/Camera';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcome' screenOptions={{headerShown:false}} >
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="camera" component={Camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;