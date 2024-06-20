import { View, Text } from "react-native";
import React from "react";
import { styles } from "../utils/styles";

export default function MessageComponent({ item, user }) {
    const status = item.user !== user;

    return (
        <View>
            <View
                style={
                    status
                        ? styles.mmessageWrapper
                        : [styles.mmessageWrapper, { alignItems: "flex-end" }]
                }
            >
                <View>
                    <View
                        style={
                            status
                                ? styles.mmessage
                                : [styles.mmessage, { backgroundColor: "#E6E6FA" }]
                        }
                    >
                        <Text style={[styles.m_username,{ marginBottom: 2 }]}>{item.user}</Text>
                        <Text style={ styles.m_text }>{item.text}</Text>
                        <Text style={ styles.m_time }>{item.time}</Text>
                    </View>
                </View>
                
            </View>
        </View>
    );
}