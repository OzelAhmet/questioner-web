import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {withTheme} from "../constants/ThemeProvider";

const Choice = (props) => {
    const styles = createStyle(props.theme);

    const onPressHandler = () => {
        props.onPress();
    };

    return (
        <TouchableOpacity activeOpacity={0.4} onPress={onPressHandler} disabled={props.disabled}>
            <View style={{...styles.container, ...props.style}}>
                <Text style={styles.text}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const createStyle = (theme) => StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: 1,
        borderColor: theme.tabIconSelected,
        padding: 10,
        marginVertical: 5,
        justifyContent: "center",
        borderRadius: 10
    },
    text: {
        color: theme.tabIconSelected,
        fontSize: 20
    }
});

export default withTheme(Choice);