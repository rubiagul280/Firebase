/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable jsx-quotes */
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
  Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Signup({navigation}) {
    const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cpassword, setCPassword] = useState(null);

  const signup = async() => {
    try {
      const doRegister = await auth().createUserWithEmailAndPassword(email, password);
      if (doRegister.user) {
        if (cpassword === password){
          Alert.alert('Account registered successfully');
          navigation.navigate('Login');
        }
      }
    } catch (e) {
         Alert.alert(e);
    }
  };

  return (
    <><StatusBar animated={true} backgroundColor="#0F172A" /><View style={styles.container}>
      <Text style={styles.text}> Register Now !</Text>

      <View style={styles.footer}>
        <Text style={styles.email}> Email</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.emailinput}
            placeholder="Your Email" 
            // eslint-disable-next-line no-shadow
            onChangeText={email => setEmail(email)}/>
        </View>

        <Text style={styles.email}> Password</Text>
        <View style={{ flexDirection: 'row' }}>

          <TextInput
            style={styles.emailinput}
            placeholder="Your Password"
            secureTextEntry={true} 
            onChangeText={password => setPassword(password)}/>
        </View>

        <Text style={styles.email}> Confirm Password</Text>
        <View style={{ flexDirection: 'row' }}>

          <TextInput
            style={styles.emailinput}
            placeholder="Confirm Your Password"
            secureTextEntry={true}
            onChangeText={cpassword => setCPassword(cpassword)}
             />
        </View>

        <Text style={styles.registermessage}>
          By signing up you agree our
          <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
            {' '}
            Terms of service{' '}
          </Text>
          <Text>and</Text>{' '}
          <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
            Privacy Policy.
          </Text>
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => signup()}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => {
            navigation.navigate('Login');
          } }>
          <Text style={styles.buttonText}>Sign In</Text>
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
    fontSize: 30,
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
    paddingVertical: 20,
  },
  email: {
    fontSize: 17,
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
    width: 253,
    borderRadius: 8,
  },
  email_icon: {
    height: 23,
    width: 30,
    marginTop: 17,
    marginRight: 10,
    marginBottom: 10,
  },
  password_icon: {
    height: 30,
    width: 30,
    marginTop: 14,
    marginRight: 10,
    marginBottom: 10,
  },
  registermessage: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#0F172A',
    marginLeft: 5,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 13,
    marginTop: 40,
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
});
