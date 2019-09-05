import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";

const Choice = (props) => {

    return (
        <TouchableOpacity activeOpacity={0.4} onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: 1,
        borderColor: Colors.theme.tabIconSelected,
        padding: 10,
        marginVertical: 5,
        justifyContent: "center",
        borderRadius: 10
    },
    text: {
        color: Colors.theme.tabIconSelected,
        fontSize: 20
    }
});

export default Choice;