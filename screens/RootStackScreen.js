import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import SignInScreen from './SignInScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import ChatRoomScreen from './ChatRoomScreen';
import Game1Screen from './Game1Screen';


function RootNavigator(){
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator 
        screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#355C7D' },
        headerTitleAlign:'left',
        headerTitleStyle:{fontWeight: 'bold'}
      }}
      >
      <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
      <Stack.Screen name="signin" component={SignInScreen} options={{headerShown: false}} />
      <Stack.Screen name="signup" component={SignupScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{title: "Games Communities",}} />
      <Stack.Screen name="Game1Screen" component={Game1Screen} options={{headerTitleAlign: 'center'}}/>
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} options={{headerTitleAlign: 'center'}}/>
    </Stack.Navigator>
  )
}
export default RootNavigator;