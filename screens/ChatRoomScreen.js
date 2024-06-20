import React, { useEffect,useRef, useState } from "react";
import { View,TextInput, FlatList, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
import MessageComponent from "../component/MessageComponent";
import { styles } from "../utils/styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import socket  from "../utils/socket";
import axios from 'axios';
import BaseURL from '../env';
import { ScrollViewBase } from "react-native";
import removePunctuation from 'remove-punctuation';
import { lowerCase, localeLowerCase } from "lower-case"
import * as tf from '@tensorflow/tfjs';
import { fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import lemmatize from  'wink-lemmatizer' ;

const ChatRoomScreen = ({route,navigation})=> {


    const { gameId , gemeName} = route.params;
    const [user, setUser] = useState("");
    const [chatMsgs, setChatMsgs] = useState([]);
    const [message, setMessage] = useState("");
    const [cheackChatLoading, setCheackChatLoading] = useState(false);
    const [isToxic, setisToxic] = useState(false);
    const[checkLoading,setcheckLoading]= useState(false);
    let ToxicDetector = useRef(null);
    const [word_index, setword_index] = useState({});
    
    

    useEffect(()=> {
        if(checkLoading===true){
          (async ()=>
          {
             await tf.ready();
             const modelWeight = await require("../assets/model/group1-shard1of1.bin");
             const modelJson = await require("../assets/model/model.json");           
             ToxicDetector.current =await tf.loadLayersModel( bundleResourceIO(modelJson,modelWeight)).catch(e=>console.log(e));
             ToxicDetector.current.summary();

             console.log("model loaded")

             const tknzr = require("../assets/tokenizerfinal.json");


             setword_index(JSON.parse(JSON.parse(tknzr).config.word_index)) ;

             console.log("token loaded")
        
        })();

        class L2 {
            static className = 'L2';
            constructor(config) {
               return tf.regularizers.l1l2(config)
            }
        }
        tf.serialization.registerClass(L2); 
         }
        },[checkLoading]);
    

  
    const saveMsg = () => {
        axios.post(`${BaseURL}/api/messages`,
            {
                roomId:gameId,
                msg_sender: user,
                msg_body: message,
            }
        )
            .then(function (response) {})
            .catch(function (err) {console.log(err.response); })
    }
        
    const getRoomChat = () => {
        axios.post(`${BaseURL}/api/messages/roomChat`,
            {roomId:gameId} )
            .then(function (response) {
                if(response.status == 200)
                {
                    response.data.forEach(element =>
                    { handleNewMessage(true,element)}); 
                } 
                else {console.log("msg not loaded");}
            })
            .catch(function (err) {console.log(err);})
    }

    const getUsername = async () => {
        try 
        {
            const value = await AsyncStorage.getItem("username");
            if (value !== null) {setUser(value);}
        } 
        catch (e) {console.error("Error while loading username!");}
    };

    
    const handleNewMessage = (old=false,Mdate) => {
        if (old===true){
            const fixed_time = {
                hour : moment(Mdate.msg_date).format('hh'),
                mins: moment(Mdate.msg_date).format('mm')}
            socket.emit("newMessage",{
                room_id: gameId,
                message:Mdate.msg_body,
                user:Mdate.msg_sender,
                timestamp:fixed_time,
                Mid:Mdate.id,
            });
            setChatMsgs((list)=>[...list,{
                room_id: gameId,
                message,
                user,
                timestamp:fixed_time,
            }
            ]);
        }
        else {
            if(message!=="") {
                const hour = new Date().getHours() 
                const mins = new Date().getMinutes() 
                if(user) {
                    socket.emit("newMessage", {
                        room_id: gameId,
                        message,
                        user,
                        timestamp: { hour, mins },
                    });
                    setChatMsgs((list)=>[...list,{
                        room_id: gameId,
                        message,
                        user,
                        timestamp: { hour, mins },}
                    ]);
                    setMessage("");
                    saveMsg();
                } 
            }
        }
    };

    useEffect(() => {
        navigation.setOptions({ title: gemeName +' chat' });
        getUsername();
        setcheckLoading(true)  
        socket.emit("findRoom", gameId);
        socket.on("foundRoom", (roomChats) =>{
            setChatMsgs(roomChats); 
            setCheackChatLoading(true);});
        return ()=>{socket.emit("leave", gameId);} 
    }, []);

    useEffect(() => {
		socket.on("roomMessage", (msgData) => {
            setChatMsgs((list)=> [...list,msgData])}); 
	}, [socket]);

    useEffect(() => { 
        if(cheackChatLoading===true){
            if (chatMsgs.length===0){
                getRoomChat(); 
            }
        } 
	}, [cheackChatLoading]);


function toknize(txt){
    var text = (removePunctuation(txt)); 
    text = lowerCase(text)
    text = text.split(' ')
    console.log(text)
    var lemma = [];
     text.forEach(element => {
        console.log(element)
        element=lemmatize.adjective(element)
        console.log(element)
        element=lemmatize.noun(element)
        console.log(element)
        element=lemmatize.verb(element)
        console.log(element)
        lemma.push(element)
      });
    console.log(lemma)
    var tokns = [];
    lemma.forEach(element => {
        if (word_index[element]!= undefined){
            tokns.push(word_index[element]);
        }
        });
    console.log(tokns)
    console.log('------------------')
         if(tokns.length<20){
            return tokns.concat(Array(20 - tokns.length).fill(0));
         }
    return tokns ; 
}

    const checkToxic= async ()=> {
        const threshould= 0.85
        var x = toknize(message)
        await ToxicDetector.current.predict(tf.tensor(Array(x))).print();
        var result = await ToxicDetector.current.predict(tf.tensor(Array(x))).dataSync();
        if(result[0]> threshould){}
        else{handleNewMessage()}
    }
   

    return (
        <View style={styles.messagingscreen}> 
            <View style={[styles.messagingscreen,{paddingVertical: 15, paddingHorizontal: 10 },]}> 
                {chatMsgs[0] ? (
                     
                    <FlatList
                        data={chatMsgs}
                        renderItem={({ item }) => (
                            <MessageComponent item={item} user={user} />
                        )}
                        key={(item) => item.name}
                    />
                ):("")
                }
            </View>

            <View style={styles.messaginginputContainer}>
                <TextInput
                    style={styles.messaginginput}
                    value= {message} 
                    placeholder="message"
                    onChangeText={(text) => setMessage(text)}  
                />
                <TouchableOpacity
                    disabled={isToxic}
                    onPress={checkToxic}
                > 
                    <Ionicons name="send-outline" 
                              color={isToxic ? 'red' :"#355C7D"}
                              size={40}
                    />
                </TouchableOpacity>
            </View>
           
        </View>
    );
};
export default ChatRoomScreen