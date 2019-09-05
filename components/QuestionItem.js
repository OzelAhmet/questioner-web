import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";

const QuestionItem = (props) => {

    return (
        <TouchableOpacity activeOpacity={0.4} onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.index}. {props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        padding: 5,
        justifyContent: "center",
        backgroundColor: Colors.theme.secondBackGround,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "grey"
    },
    text: {
        fontSize: 25,
        color: Colors.theme.textColor
    }
});

export default QuestionItem;