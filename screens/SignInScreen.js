
import React from 'react';
import {
    View, Text, TextInput, StatusBar, StyleSheet, TouchableOpacity, Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios'
import BaseURL from '../env';
import AsyncStorage from "@react-native-async-storage/async-storage";



const SigninScreen = ({ navigation }) => {
   
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_TextInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidpass: true,
    });
    const storeUsername = async () => {
        try {
            await AsyncStorage.setItem("username", data.username);
            navigation.navigate('Home');
            }
         catch (e) {
            console.log(e)
            Alert.alert("Error! While saving username");
        }
    };

    const check_login = () => {
        axios.post(`${BaseURL}/api/accounts/login`, { username: data.username, password: data.password })
            .then(function (response) {
                // handle success
                if (response.data == true) {
                    storeUsername();
                } else {
                    //console.log(response.data)
                    Alert.alert('Account not found', 'Please check your input.',
                    [
                        { text: 'Ok' }
                    ]);
                }
            })
            .catch(function (err) {
                console.log(err)
                Alert.alert('Account not found', 'Please check your input.',
                [
                    { text: 'Ok' }
                ]);
            })
    }

    const textInputChange = (val) => {
        if (val.trim().length >= 5) {
            setData({
                ...data,
                username: val,
                check_TextInputChange: true,
                isValidUser: true
            });
        }
        else {
            setData({
                ...data,
                username: val,
                check_TextInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswardChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidpass: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidpass: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyles="light-content" />
            <LinearGradient
                // Background Linear Gradient
                colors={['#355C7D', '#6C5B7B', '#C06C84']}
                style={styles.container}
            >
                <View style={styles.header}>
                    <Text style={styles.text_header}>Login</Text>
                </View>

                <Animatable.View
                    animation='fadeInUpBig'
                    style={styles.footer}
                >

                    <Text style={[styles.text_footer, { marginTop: 35 }]}>Username</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Username"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.check_TextInputChange ?
                            <Animatable.View animation='bounceIn'>
                                <Ionicons
                                    name="checkmark-circle-outline"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswardChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    colors='green'
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    colors='green'
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                
                    <TouchableOpacity>
                        <Text style={{ color: '#6C5B7B', marginTop: 15 }}>
                            Forget password?
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { check_login() }}
                        >
                            <LinearGradient
                                colors={['#355C7D', '#6C5B7B', '#C06C84']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]} >
                                    Login
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('signup')}
                            style={[styles.signIn, {
                                borderColor: '#6C5B7B',
                                borderwidth: 1,
                                marginTop: 15,
                            }
                            ]}
                        >
                            <Text
                                style={[styles.textSign, {
                                    color: '#6C5B7B'
                                }]} >
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>

                </Animatable.View>
            </LinearGradient>
        </View>

    );
};

export default SigninScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
       // marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});
