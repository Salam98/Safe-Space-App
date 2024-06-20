import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar ,TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {

  return (
     
        <View style={styles.container}>
        <StatusBar translucent backgroundColor='#355C7D' barStyles="light-content" />
  
        <View style={styles.button}>
          
        <TouchableOpacity onPress={()=>navigation.navigate('Game1Screen',
        {
              gameId:1 , gemeName:'Fortnite'
            }
            )} >
                <LinearGradient
                    colors={['#355C7D', '#6C5B7B','#C06C84']}
                    style={styles.btn}
                >
                    <Text style={styles.text} >Fortnite </Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('Game1Screen',
            {
              gameId:2 , gemeName:'Call of Duty'
            }
            )} >
                <LinearGradient
                    colors={['#355C7D', '#6C5B7B','#C06C84']}
                    style={styles.btn}
                >
                    <Text style={styles.text} > Call of Duty </Text>
                </LinearGradient>
            </TouchableOpacity>

            </View> 
    </View>
  )
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
   // backgroundColor: '#6C5B7B'
  },
  text: {
    fontSize: 38,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  btn:{
    width: 350,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    margin: 20,
    color: '#6C5B7B'
  },
  
});

