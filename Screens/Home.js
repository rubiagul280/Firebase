/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function Home({navigation}) {
  return (
    <>
      <StatusBar animated={true} backgroundColor="#0F172A" />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.container}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                What's Alzheimer?
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                  marginTop: 8,
                }}>
                Objectives
              </Text>
              <Text style={{fontSize: 15, marginTop: 5}}>
                BO-1: Eliminate the risk to the patient’s life.
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Medication')}>
                <Text style={styles.buttonText}>Medication</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Game')}>
                <Text style={styles.buttonText}>Game</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
  home: {
    color: '#fff',
    marginTop: 68,
    marginLeft: 145,
    fontSize: 25,
  },
  viewtreat: {
    marginTop: 40,
    marginLeft: 15,
    flexDirection: 'row',
  },
  view: {
    marginLeft: 47,
    marginTop: 8.5,
    color: '#69a4d5',
  },
  container: {
    height: 900,
    width: 300,
    margin: 25,
    marginTop: 40,
    borderRadius: 14,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signup: {
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 25,
    marginTop: 200,
    width: 270,
    height: 47,
    alignItems: 'center',
    marginLeft: -135,
  },
  button: {
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 13,
    marginTop: 50,
    width: 290,
    height: 47,
    alignItems: 'center',
    marginLeft: 6,
  },
});
