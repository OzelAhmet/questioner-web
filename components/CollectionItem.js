import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {withTheme} from "../constants/ThemeProvider";

const CollectionItem = (props) => {
    const styles = createStyle(props.theme);

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} onLongPress={props.onLongPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const createStyle = (theme) => StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        marginVertical: 5,
        padding: 5,
        paddingLeft: 30,
        justifyContent: "center",
        backgroundColor: theme.tabIconSelected,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
    },
    text: {
        fontSize: 25,
        color: "#fff"
        // color: Colors.theme.textColor
    }
});

export default withTheme(CollectionItem);