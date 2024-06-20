import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useEffect ,useState} from 'react'
import {View, ActivityIndicator} from 'react-native';
import { AuthContext } from './component/context';
import RootNavigator from './screens/RootStackScreen';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';
import Game1Screen from './screens/Game1Screen';
import * as tf from '@tensorflow/tfjs';
import { fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';





const Stack = createNativeStackNavigator();

const App  =() => {
  
  initialLoginState ={
    isLoading: true,
    username:null,
    userToken:null
  };
  
  const loginReducer = (prevState,action)=> {
    switch (action.type){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken:action.token,
          isLoading:false,
        };
        case 'LOGIN':
        return {
          ...prevState,
          username:action.id,
          userToken:action.token,
          isLoading:false,
        };
        case 'LOGOUT':
        return {
          ...prevState,
          username:null,
          userToken:null,
          isLoading:false,
        };
        case 'REGISTER':
        return {
           ...prevState,
          username:action.id,
          userToken:action.token,
          isLoading:false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState)


  const authContext =React.useMemo(()=>({
    signIn: async(foundUser)=>{
      const userToken=String(foundUser[0].userToken);
      const username=foundUser[0].username;
        try{
        }
        catch(e){
          console.log(e)
        }
      
      dispatch({type:'LOGIN', id:username, token:userToken });
    },
    signOut:async()=>{
      try{
      }
      catch(e){
        console.log(e)
      }
      dispatch({type:'LOGOUT'});
    },
    signUp:()=>{

    },
  }),[]);  

  useEffect(()=> {
    setTimeout(async()=>{
     let userToken;
     userToken=null;
     try{
    }
    catch(e){
      console.log(e)
    }
     dispatch({type:'REGISTER', token: userToken });
    },1000);
  },[]);

  if(loginState.isLoading){
    return(
      <View
          style={{flex:1,justifyContent:'center',alignItems:"center"}}>
          <ActivityIndicator size="large"/>
      </View>
    );
  }
    return(
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken!= null ? (
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <DrawerScreen name="SplashScreen" component={SplashScreen} />
          <DrawerScreen name="SignInScreen" component={SignInScreen} />
          <DrawerScreen name="SignupScreen" component={SignupScreen} />
          <DrawerScreen name="HomeScreen" component={HomeScreen} />
          <DrawerScreen name="ChatRoom" component={ChatRoomScreen} />
          <DrawerScreen name="Game1Screen" component={Game1Screen} />
          </Drawer.Navigator>
        )
      :
      <RootNavigator/>
      }
      </NavigationContainer>
    </AuthContext.Provider>
    );
}
export default App;