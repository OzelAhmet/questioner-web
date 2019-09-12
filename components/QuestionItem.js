import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {withTheme} from "../constants/ThemeProvider";

const QuestionItem = (props) => {
    const styles = createStyle(props.theme);

    return (
        <TouchableOpacity activeOpacity={0.4} onPress={props.onPress} onLongPress={props.onLongPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.index}. {props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const createStyle = (theme) => StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        padding: 5,
        justifyContent: "center",
        backgroundColor: theme.secondBackGround,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "grey"
    },
    text: {
        fontSize: 25,
        color: theme.textColor
    }
});

export default withTheme(QuestionItem);