
import React, { useState } from 'react';
import {
    View, Text, TextInput, ScrollView, StatusBar, Alert, StyleSheet, TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
import axios from 'axios';
import BaseURL from '../env';




const SignupScreen = ({ navigation }) => {
    

    const [data, setData] = React.useState({
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        secureTextEntry: true,
        confirm_secureTextEntry: true,
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
    const [check_PassValid, setcheck_PassValid] = useState("")
    const [check_EmailValid, setcheck_EmailValid] = useState("")
    const [check_UserValid, setcheck_UserValid] = useState("")
    const [check_ConPassValid, setcheck_ConPassValid] = useState("")


    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [gender, setGender] = useState("")

    const [isVisible, setisVisible] = useState(false);
    const [chosenDate, setchosenDate] = useState("");

   

    const creat_account = () => {
        axios.post(`${BaseURL}/api/accounts`,
            {
                username: data.username,
                password: data.password,
                email: data.email,
                gender: gender,
                date_of_birth: chosenDate,
            }
        )
            .then(function (response) {
                // handle success
                if (response.data == data.username) {
                    storeUsername();
                } else {
                    Alert.alert('Username or Email already taken ', 'Please try another one.',
                [
                    { text: 'Ok' }
                ]);
                }
            })
            .catch(function (err) {
                // handle error
                 console.log(err)
                Alert.alert('Username or Email already taken', 'please try again',
                [
                    { text: 'Ok' }
                ]);
            })
    }

    const checkEmailValid = (val) => {
        data.email=val;
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (re.test(val) || regex.test(val)) {
            setcheck_EmailValid(false)
        }
        else {
            setcheck_EmailValid(true)
        }
    }
    const checkUserValid = (val) => {
        data.username=val;
        let isValidLength = /^.{5,20}$/;
        if (isValidLength.test(val)) {
            setcheck_UserValid(false)
        }
        else {
            setcheck_UserValid(true)
        }
    }

    const checkPassValid = (val) => {
        data.password=val;
        let isValidLengthpass = /^.{8,20}$/;
        if (isValidLengthpass.test(val)) {
            setcheck_PassValid(false);
            checkConPassValid(data.confirm_password)
        } else {
            setcheck_PassValid(true);
            checkConPassValid(data.confirm_password)
        }
    }

    const checkConPassValid = (val) => {
        data.confirm_password=val;
        if (val == data.password) {
            setcheck_ConPassValid(false)
        } else {
            setcheck_ConPassValid(true)
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    const updateConSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }

    const handlePicker = (datetime) => {
        setisVisible(false);
        setchosenDate( moment(datetime).format('YYYY-MM-DD'));
    
    }
    const hidePicker = () => {
        setisVisible(false)
    }
    const showPicker = () => {
        setisVisible(true)
    }

    const genderMale = () => {
        setMale(true);
        setFemale(false);
        setGender("Male");
    }

    const genderFemale = () => {
        setMale(false);
        setFemale(true);
        setGender("Female");
    }

    const checkInputs = () => {
        if (check_UserValid == true || check_EmailValid == true || check_PassValid == true || gender == ''|| chosenDate == ''|| check_ConPassValid==true) {
            Alert.alert('Missing Inputs', 'Please check youe inputs',
                [
                    { text: 'Ok' }
                ]);
        } else{
            creat_account()
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyles="light-content" />
            <LinearGradient
                colors={['#355C7D', '#6C5B7B', '#C06C84']}
                style={styles.container}
            >
                <View style={styles.header}>
                    <Text style={styles.text_header}>Register Now!</Text>
                </View>



                <Animatable.View
                    animation='fadeInUpBig'
                    style={styles.footer}
                >
                    <ScrollView>
                        <Text style={[styles.text_footer, { marginTop: 35 }]}>Email</Text>
                        <View style={styles.action}>
                            <Ionicons
                                name="mail-outline"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Your Email"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => { checkEmailValid(val) }}

                            />
                        </View>
                        {check_EmailValid ?
                            <Text style={styles.textFailed}>Wrong format email.</Text>
                            :
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Ionicons
                                    name="checkmark-circle-outline"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                        }


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
                                onChangeText={(val) => { checkUserValid(val) }}
                            />
                        </View>
                        {check_UserValid ?
                            <Text style={styles.textFailed}>Username must be at least 5 Characters Long.</Text>
                            :
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Ionicons
                                    name="checkmark-circle-outline"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                        }



                        <Text style={[styles.text_footer, { marginTop: 35 }]}>Date of birth</Text>
                        <View style={styles.action}>
                            <TouchableOpacity style={[styles.button1]} onPress={showPicker}>
                                <Ionicons
                                    name="calendar-outline"
                                    color="#05375a"
                                    size={20}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isVisible}
                                onConfirm={handlePicker}
                                onCancel={hidePicker}
                                mode={'datetime'}
                            />
                            <View> 
                            <Text style={[{color:'#05375a'}, {fontsize: 20},{margin:10} ]}>
                                {chosenDate}
                            </Text>
                            </View>

                        </View>


                        <Text style={[styles.text_footer, { marginTop: 35 }, { justifyContent: 'center' }]}>Gender</Text>
                        <View style={[styles.action, { alignItems: 'center' }]}>
                            <FontAwesome
                                name="user-o"
                                color="#05375a"
                                size={20}
                            />
                            <CheckBox
                                title="Male"
                                center
                                checked={male}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                onPress={genderMale}
                            />
                            <CheckBox
                                title="Female"
                                center
                                checked={female}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                onPress={genderFemale}
                            />
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
                                onChangeText={(val) => {checkPassValid(val)}}
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
                        {check_PassValid ?
                            (
                                <Text style={styles.textFailed}>Password must be at least 8 Characters Long.</Text>
                            )
                            :
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Ionicons
                                    name="checkmark-circle-outline"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                        }

                        <Text style={[styles.text_footer, { marginTop: 35 }]}>Confirm Password</Text>
                        <View style={styles.action}>
                            <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Password"
                                secureTextEntry={data.confirm_secureTextEntry ? true : false}
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => checkConPassValid(val)}
                            />
                            <TouchableOpacity
                                onPress={updateConSecureTextEntry}
                            >
                                {data.confirm_secureTextEntry ?
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
                        {check_ConPassValid ?
                            <Text style={styles.textFailed}>Passwords not matched.</Text>
                            :
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Ionicons
                                    name="checkmark-circle-outline"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                        }


                        <View style={styles.textPrivate}>
                            <Text style={styles.color_textPrivate}>
                                By signing up you agree to our
                            </Text>
                            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                            <Text style={styles.color_textPrivate}>{" "}and</Text>
                            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                        </View>

                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={checkInputs}
                            >
                                <LinearGradient
                                    colors={['#355C7D', '#6C5B7B', '#C06C84']}
                                    style={styles.signIn}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#fff'
                                    }]} >
                                        Sign up
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => navigation.navigate('signin')}
                                style={[styles.signIn, {
                                    borderColor: '#009387',
                                    borderwidth: 1,
                                    marginTop: 15,
                                }]}
                            >
                                <Text
                                    style={[styles.textSign, {
                                        color: '#6C5B7B'
                                    }]}
                                >
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Animatable.View>
            </LinearGradient>
        </View>

    );
};

export default SignupScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
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
        marginTop: Platform.OS === 'ios' ? 0 : -12,
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
    button1: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#6C5B7B'
    },
    textFailed: {
        alignSelf: 'flex-end',
        color: 'red',
    }
});