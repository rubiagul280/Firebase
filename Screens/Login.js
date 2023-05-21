/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';


export default function Login({navigation}) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const login = async () => {
      try {
        const doLogin = await auth().signInWithEmailAndPassword(email, password);
        if (doLogin.user) {
          navigation.navigate('Home');
        }
      } catch (e) {
        Alert.alert(e.message);
      }
    };

  return (
    <><StatusBar animated={true} backgroundColor="#0F172A" />
    <View style={styles.container}>
      <Text style={styles.text}> Welcome !</Text>

      <View style={styles.footer}>
        <Text style={styles.email}> Email</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.emailinput}
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail} />
        </View>

        <Text style={styles.email}> Password</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.emailinput}
            placeholder="Your Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword} />
        </View>

        <Text style={styles.forgotpassword}> Forgot Password ?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => login(email, password)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => {
            navigation.navigate('Sign');
          } }>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginTop: 130,
    marginBottom: 30,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  email: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 10,
  },
  emailinput: {
    marginTop: 10,
    marginLeft: 1,
    paddingLeft: 10,
    borderWidth: 2,
    height: 40,
    width: 250,
    borderRadius: 8,
  },
  email_icon: {
    height: 20,
    width: 25,
    marginTop: 19,
    marginRight: 10,
    marginBottom: 10,
  },
  password_icon: {
    height: 24,
    width: 24,
    marginTop: 17,
    marginRight: 10,
    marginBottom: 10,
  },
  forgotpassword: {
    fontSize: 13,
    fontWeight: 'light',
    color: '#00ACD6',
    marginLeft: 5,
    marginTop: 30,
    textAlign: 'center',
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
  buttonText: {
    color: 'white',
  },
  signup: {
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 13,
    marginTop: 20,
    width: 290,
    height: 47,
    alignItems: 'center',
    marginLeft: 6,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
