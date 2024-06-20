
import React from 'react';
import{
    View,Image,StatusBar, Text , Button, Dimensions,  StyleSheet,TouchableOpacity} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import logo from '../assets/logo.png';



const SplashScreen=({navigation})=>{
    return (

        <View style = {styles.container}> 
        <StatusBar  translucent backgroundColor = "transparent" barStyles="light-content"/>
          <LinearGradient 
            // Background Linear Gradient
            colors={['#355C7D', '#6C5B7B','#C06C84']}
            style={styles.container}
            >
            
          <View 
            style = {styles.header}
            >{
            <><Image source={logo} style={{ width: 305, height: 159 }} />
            <Text style={{ color: '#fff', fontSize: 20 ,fontWeight: 'bold', marginTop:20}}>
                        Social Platform for Gamers
            </Text></>
            }
         </View>
        

        

            <Animatable.View 
                style={[styles.footer]}
                animation="fadeInUpBig"
        >
            <Text style={[styles.title]}>Welcome to SafeSpace </Text>
            <Text></Text>
            <Text style={styles.text}>Join Us In SafeSpace</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('signup')}>
                <LinearGradient
                    colors={['#355C7D', '#6C5B7B','#C06C84']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Create an account</Text>
                    <Ionicons 
                        name="chevron-forward-outline"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>

           <View style={{marginTop:7}}>
            <Text style={styles.text}>Already Have an account?</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('signin')}>
                <LinearGradient
                    colors={['#355C7D', '#6C5B7B','#C06C84']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Login</Text>
                    <Ionicons 
                        name="chevron-forward-outline"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
            </View>
        </Animatable.View>
        </LinearGradient>

        </View>

    );
};

export default SplashScreen;


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  
  button: {
      alignItems: 'center',
      marginTop: 10
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});