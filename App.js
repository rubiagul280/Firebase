/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React from 'react';
import PuzzleScreen from './Screens/PuzzleScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, StyleSheet, Text} from 'react-native';
import PuzzleGame from './Screens/PuzzleScreen';
import MemoryGame from './Screens/MemoryGame';

const Stack = createNativeStackNavigator();

function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="Splash"
    //     screenOptions={{headerShown: false}}>
    //     <Stack.Screen name="Home" component={Home} />
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Sign" component={Signup} />
    //     <Stack.Screen name="Medication" component={Medication} />
    //     <Stack.Screen name="Game" component={Game} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <View style={styles.container}>
    <MemoryGame />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
